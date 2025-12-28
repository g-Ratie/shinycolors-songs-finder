"use client";

import { useState } from "react";
import { submitInquiry } from "./actions";
import type { InquiryType } from "@/lib/types/database";

const inquiryTypes: { value: InquiryType; label: string }[] = [
  { value: "request", label: "機能リクエスト・要望" },
  { value: "question", label: "質問・お問い合わせ" },
  { value: "other", label: "その他" },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setResult(null);

    const response = await submitInquiry(formData);

    if (response.success) {
      setResult({
        success: true,
        message: "お問い合わせを送信しました。ありがとうございます。",
      });
      const form = document.querySelector("form") as HTMLFormElement;
      form?.reset();
    } else {
      setResult({
        success: false,
        message: response.error || "送信に失敗しました",
      });
    }

    setIsSubmitting(false);
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="inquiryType"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          お問い合わせ種別 <span className="text-red-500">*</span>
        </label>
        <select
          id="inquiryType"
          name="inquiryType"
          required
          className="w-full px-4 py-2 bg-white border border-shiny-blue/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-shiny-blue focus:border-shiny-blue"
        >
          <option value="">選択してください</option>
          {inquiryTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          お名前 <span className="text-slate-400 text-xs">（任意）</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          maxLength={100}
          className="w-full px-4 py-2 bg-white border border-shiny-blue/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-shiny-blue focus:border-shiny-blue"
          placeholder="匿名でも構いません"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={6}
          maxLength={2000}
          className="w-full px-4 py-2 bg-white border border-shiny-blue/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-shiny-blue focus:border-shiny-blue resize-none"
          placeholder="お問い合わせ内容を入力してください"
        />
        <p className="mt-1 text-xs text-slate-500">2000文字以内</p>
      </div>

      {result && (
        <div
          className={`p-4 rounded-lg ${
            result.success
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {result.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-shiny-blue text-white rounded-lg hover:bg-shiny-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {isSubmitting ? "送信中..." : "送信する"}
      </button>
    </form>
  );
}
