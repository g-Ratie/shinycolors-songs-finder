"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "エラーが発生しました。");
        return;
      }

      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMessage("ネットワークエラーが発生しました。");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg border border-slate-200 p-8 text-center">
          <div className="inline-block w-8 h-8 border-4 border-shiny-blue border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-slate-600">送信中...</p>
        </div>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg border border-slate-200 p-8 text-center">
          <h1 className="text-xl font-bold text-slate-800">
            メールを確認してください
          </h1>
          <p className="mt-4 text-slate-600">
            ログインリンクを送信しました。メールに記載されたリンクをクリックしてログインしてください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg border border-slate-200 p-8">
        <h1 className="text-xl font-bold text-slate-800 text-center">
          管理者ログイン
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-shiny-blue focus:border-shiny-blue"
              placeholder="admin@example.com"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-shiny-blue hover:bg-shiny-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-shiny-blue disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "送信中..." : "ログインリンクを送信"}
          </button>
        </form>
      </div>
    </div>
  );
}
