"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import type { Inquiry, InquiryType } from "@/lib/types/database";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER;
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME;

interface CreateIssuesResult {
  success: boolean;
  createdCount?: number;
  error?: string;
}

const inquiryTypeLabels: Record<InquiryType, string> = {
  request: "機能リクエスト",
  question: "質問",
  other: "その他",
};

export async function createGitHubIssues(
  inquiryIds: string[]
): Promise<CreateIssuesResult> {
  if (!GITHUB_TOKEN || !GITHUB_REPO_OWNER || !GITHUB_REPO_NAME) {
    return { success: false, error: "GitHub環境変数が設定されていません" };
  }

  const supabase = createAdminClient();
  const { data: inquiries, error: fetchError } = await supabase
    .from("inquiries")
    .select("*")
    .in("id", inquiryIds)
    .neq("status", "issued");

  if (fetchError) {
    console.error("Failed to fetch inquiries:", fetchError);
    return { success: false, error: "お問い合わせの取得に失敗しました" };
  }

  if (!inquiries || inquiries.length === 0) {
    return { success: false, error: "Issue化可能なお問い合わせがありません" };
  }

  let createdCount = 0;

  for (const inquiry of inquiries as Inquiry[]) {
    try {
      const issueTitle = `[${inquiryTypeLabels[inquiry.inquiry_type]}] ${
        inquiry.content.slice(0, 50)
      }${inquiry.content.length > 50 ? "..." : ""}`;

      const issueBody = `## お問い合わせ内容

${inquiry.content}

---
- 種別: ${inquiryTypeLabels[inquiry.inquiry_type]}
- 送信者: ${inquiry.name || "匿名"}
- 送信日時: ${new Date(inquiry.created_at).toLocaleString("ja-JP")}
- お問い合わせID: ${inquiry.id}
`;

      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/issues`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
          body: JSON.stringify({
            title: issueTitle,
            body: issueBody,
            labels:
              inquiry.inquiry_type === "request"
                ? ["enhancement"]
                : ["question"],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("GitHub API error:", errorData);
        continue;
      }

      const issueData = await response.json();

      const { error: updateError } = await supabase
        .from("inquiries")
        .update({
          status: "issued",
          github_issue_url: issueData.html_url,
        })
        .eq("id", inquiry.id);

      if (updateError) {
        console.error("Failed to update inquiry:", updateError);
      }

      createdCount++;
    } catch (error) {
      console.error("Failed to create issue:", error);
    }
  }

  if (createdCount === 0) {
    return { success: false, error: "Issueの作成に失敗しました" };
  }

  return { success: true, createdCount };
}
