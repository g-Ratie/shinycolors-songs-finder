"use client";

import { useState } from "react";
import type { VibeTag } from "@/lib/types/database";
import { createVibeTag, deleteVibeTag } from "./actions";

interface VibeTagListProps {
  initialTags: VibeTag[];
}

export function VibeTagList({ initialTags }: VibeTagListProps) {
  const [tags, setTags] = useState(initialTags);
  const [newTagName, setNewTagName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) return;

    setIsSubmitting(true);
    setMessage(null);

    const result = await createVibeTag(newTagName.trim());

    if (result.success) {
      setMessage({ type: "success", text: "タグを追加しました" });
      setNewTagName("");
      // ページをリロードして最新データを取得
      window.location.reload();
    } else {
      setMessage({ type: "error", text: result.error || "エラーが発生しました" });
    }

    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`「${name}」を削除しますか？\n紐付けられた楽曲からも削除されます。`)) {
      return;
    }

    const result = await deleteVibeTag(id);

    if (result.success) {
      setTags(tags.filter((t) => t.id !== id));
      setMessage({ type: "success", text: "タグを削除しました" });
    } else {
      setMessage({ type: "error", text: result.error || "削除に失敗しました" });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreate} className="flex gap-3">
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="新しいタグ名"
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shiny-blue"
        />
        <button
          type="submit"
          disabled={isSubmitting || !newTagName.trim()}
          className="px-4 py-2 bg-shiny-blue text-white rounded-lg hover:bg-shiny-blue-dark transition-colors disabled:opacity-50 text-sm font-medium"
        >
          {isSubmitting ? "追加中..." : "追加"}
        </button>
      </form>

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

      <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-200">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center justify-between px-4 py-3"
          >
            <div>
              <span className="text-slate-800">{tag.name}</span>
              <span className="ml-2 text-xs text-slate-400">({tag.slug})</span>
            </div>
            <button
              onClick={() => handleDelete(tag.id, tag.name)}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-700"
            >
              削除
            </button>
          </div>
        ))}
        {tags.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            タグがありません
          </div>
        )}
      </div>
    </div>
  );
}
