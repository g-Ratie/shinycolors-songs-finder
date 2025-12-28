"use client";

import { useState } from "react";
import type { Unit } from "@/lib/types/database";
import { createUnit, updateUnit, deleteUnit } from "./actions";

interface UnitListProps {
  initialUnits: Unit[];
}

export function UnitList({ initialUnits }: UnitListProps) {
  const [units, setUnits] = useState(initialUnits);
  const [newUnitName, setNewUnitName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUnitName.trim()) return;

    setIsSubmitting(true);
    setMessage(null);

    const result = await createUnit(newUnitName.trim());

    if (result.success) {
      setMessage({ type: "success", text: "ユニットを追加しました" });
      setNewUnitName("");
      window.location.reload();
    } else {
      setMessage({ type: "error", text: result.error || "エラーが発生しました" });
    }

    setIsSubmitting(false);
  };

  const handleUpdate = async (id: string) => {
    if (!editingName.trim()) return;

    setIsSubmitting(true);
    const result = await updateUnit(id, editingName.trim());

    if (result.success) {
      setUnits(units.map((u) => (u.id === id ? { ...u, name: editingName.trim() } : u)));
      setEditingId(null);
      setMessage({ type: "success", text: "ユニットを更新しました" });
    } else {
      setMessage({ type: "error", text: result.error || "更新に失敗しました" });
    }

    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`「${name}」を削除しますか？\n関連するメンバーの所属情報も削除されます。`)) {
      return;
    }

    const result = await deleteUnit(id);

    if (result.success) {
      setUnits(units.filter((u) => u.id !== id));
      setMessage({ type: "success", text: "ユニットを削除しました" });
    } else {
      setMessage({ type: "error", text: result.error || "削除に失敗しました" });
    }
  };

  const startEdit = (unit: Unit) => {
    setEditingId(unit.id);
    setEditingName(unit.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreate} className="flex gap-3">
        <input
          type="text"
          value={newUnitName}
          onChange={(e) => setNewUnitName(e.target.value)}
          placeholder="新しいユニット名"
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shiny-blue"
        />
        <button
          type="submit"
          disabled={isSubmitting || !newUnitName.trim()}
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
        {units.map((unit) => (
          <div
            key={unit.id}
            className="flex items-center justify-between px-4 py-3"
          >
            {editingId === unit.id ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="flex-1 px-3 py-1 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-shiny-blue"
                />
                <button
                  onClick={() => handleUpdate(unit.id)}
                  disabled={isSubmitting}
                  className="px-3 py-1 text-sm bg-shiny-blue text-white rounded hover:bg-shiny-blue-dark"
                >
                  保存
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-3 py-1 text-sm text-slate-600 hover:text-slate-800"
                >
                  キャンセル
                </button>
              </div>
            ) : (
              <>
                <div>
                  <span className="text-slate-800">{unit.name}</span>
                  <span className="ml-2 text-xs text-slate-400">({unit.slug})</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(unit)}
                    className="px-3 py-1 text-sm text-shiny-blue hover:text-shiny-blue-dark"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(unit.id, unit.name)}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-700"
                  >
                    削除
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        {units.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            ユニットがありません
          </div>
        )}
      </div>
    </div>
  );
}
