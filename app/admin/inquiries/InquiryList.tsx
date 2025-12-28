"use client";

import { useState } from "react";
import type { Inquiry, InquiryType, InquiryStatus } from "@/lib/types/database";
import { createGitHubIssues } from "./actions";

interface InquiryListProps {
  initialInquiries: Inquiry[];
}

const inquiryTypeLabels: Record<InquiryType, string> = {
  request: "要望",
  question: "質問",
  other: "その他",
};

const inquiryTypeColors: Record<InquiryType, string> = {
  request: "bg-blue-100 text-blue-800",
  question: "bg-green-100 text-green-800",
  other: "bg-slate-100 text-slate-800",
};

const statusLabels: Record<InquiryStatus, string> = {
  pending: "未対応",
  in_progress: "対応中",
  completed: "完了",
  issued: "Issue化済",
};

const statusColors: Record<InquiryStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  issued: "bg-purple-100 text-purple-800",
};

export function InquiryList({ initialInquiries }: InquiryListProps) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isCreatingIssues, setIsCreatingIssues] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === inquiries.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(inquiries.map((i) => i.id)));
    }
  };

  const handleCreateIssues = async () => {
    if (selectedIds.size === 0) return;

    setIsCreatingIssues(true);
    setMessage(null);

    const result = await createGitHubIssues(Array.from(selectedIds));

    if (result.success) {
      setMessage({
        type: "success",
        text: `${result.createdCount}件のIssueを作成しました`,
      });
      setInquiries((prev) =>
        prev.map((inquiry) =>
          selectedIds.has(inquiry.id)
            ? { ...inquiry, status: "issued" as InquiryStatus }
            : inquiry
        )
      );
      setSelectedIds(new Set());
    } else {
      setMessage({
        type: "error",
        text: result.error || "Issue作成に失敗しました",
      });
    }

    setIsCreatingIssues(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={selectedIds.size === inquiries.length && inquiries.length > 0}
              onChange={toggleSelectAll}
              className="w-4 h-4 rounded border-slate-300"
            />
            すべて選択
          </label>
          {selectedIds.size > 0 && (
            <span className="text-sm text-slate-600">
              {selectedIds.size}件選択中
            </span>
          )}
        </div>
        <button
          onClick={handleCreateIssues}
          disabled={selectedIds.size === 0 || isCreatingIssues}
          className="px-4 py-2 bg-shiny-blue text-white rounded-lg hover:bg-shiny-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          {isCreatingIssues
            ? "Issue作成中..."
            : `選択した${selectedIds.size}件をIssue化`}
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-3">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className={`bg-white rounded-lg border p-4 ${
              selectedIds.has(inquiry.id)
                ? "border-shiny-blue ring-1 ring-shiny-blue"
                : "border-slate-200"
            }`}
          >
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={selectedIds.has(inquiry.id)}
                onChange={() => toggleSelection(inquiry.id)}
                className="mt-1 w-4 h-4 rounded border-slate-300"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      inquiryTypeColors[inquiry.inquiry_type]
                    }`}
                  >
                    {inquiryTypeLabels[inquiry.inquiry_type]}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      statusColors[inquiry.status]
                    }`}
                  >
                    {statusLabels[inquiry.status]}
                  </span>
                  <span className="text-xs text-slate-400">
                    {formatDate(inquiry.created_at)}
                  </span>
                  {inquiry.name && (
                    <span className="text-xs text-slate-500">
                      from: {inquiry.name}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-slate-700 whitespace-pre-wrap">
                  {inquiry.content}
                </p>
                {inquiry.github_issue_url && (
                  <a
                    href={inquiry.github_issue_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-sm text-shiny-blue-dark hover:text-shiny-blue"
                  >
                    GitHub Issue を見る
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {inquiries.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            お問い合わせはありません
          </div>
        )}
      </div>
    </div>
  );
}
