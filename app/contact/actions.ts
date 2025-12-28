"use server";

import { supabase } from "@/lib/supabase";
import type { InquiryType } from "@/lib/types/database";

interface SubmitInquiryResult {
  success: boolean;
  error?: string;
}

export async function submitInquiry(formData: FormData): Promise<SubmitInquiryResult> {
  const inquiryType = formData.get("inquiryType") as InquiryType;
  const name = formData.get("name") as string | null;
  const content = formData.get("content") as string;

  if (!inquiryType || !content) {
    return { success: false, error: "必須項目を入力してください" };
  }

  if (content.length > 2000) {
    return { success: false, error: "内容は2000文字以内で入力してください" };
  }

  const { error } = await supabase.from("inquiries").insert({
    inquiry_type: inquiryType,
    name: name || null,
    content,
  });

  if (error) {
    console.error("Failed to submit inquiry:", error);
    return { success: false, error: "送信に失敗しました。時間をおいて再度お試しください" };
  }

  return { success: true };
}
