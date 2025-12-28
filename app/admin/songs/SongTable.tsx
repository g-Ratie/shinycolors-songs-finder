"use client";

import { useState } from "react";
import type {
  SongWithRelations,
  Unit,
  VibeTag,
  SongType,
  AttributeType,
} from "@/lib/types/database";
import { createSong, updateSong, deleteSong } from "./actions";

interface Member {
  id: string;
  name: string;
  unit_id: string;
}

interface SongTableProps {
  songs: SongWithRelations[];
  units: Unit[];
  vibeTags: VibeTag[];
  members: Member[];
}

const songTypes: { value: SongType; label: string }[] = [
  { value: "unit", label: "ユニット曲" },
  { value: "solo", label: "ソロ曲" },
  { value: "collaboration", label: "コラボ曲" },
  { value: "other", label: "その他" },
];

const attributes: { value: AttributeType; label: string }[] = [
  { value: "stella", label: "Stella" },
  { value: "luna", label: "Luna" },
  { value: "sol", label: "Sol" },
];

export function SongTable({ songs, units, vibeTags, members }: SongTableProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<SongWithRelations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    unit_id: "",
    member_id: "",
    song_type: "unit" as SongType,
    attribute: "" as AttributeType | "",
    youtube_url: "",
    vibe_tag_ids: [] as string[],
  });

  const resetForm = () => {
    setFormData({
      title: "",
      unit_id: "",
      member_id: "",
      song_type: "unit",
      attribute: "",
      youtube_url: "",
      vibe_tag_ids: [],
    });
    setEditingSong(null);
  };

  const openCreateForm = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openEditForm = (song: SongWithRelations) => {
    setFormData({
      title: song.title,
      unit_id: song.unit_id,
      member_id: song.member_id || "",
      song_type: song.song_type,
      attribute: song.attribute || "",
      youtube_url: song.youtube_url || "",
      vibe_tag_ids: song.vibe_tags.map((t) => t.id),
    });
    setEditingSong(song);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const input = {
      title: formData.title,
      unit_id: formData.unit_id,
      member_id: formData.member_id || null,
      song_type: formData.song_type,
      attribute: formData.attribute || null,
      youtube_url: formData.youtube_url,
      vibe_tag_ids: formData.vibe_tag_ids,
    };

    const result = editingSong
      ? await updateSong(editingSong.id, input)
      : await createSong(input);

    if (result.success) {
      setMessage({
        type: "success",
        text: editingSong ? "楽曲を更新しました" : "楽曲を追加しました",
      });
      setIsFormOpen(false);
      resetForm();
    } else {
      setMessage({ type: "error", text: result.error || "エラーが発生しました" });
    }

    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("本当に削除しますか？")) return;

    const result = await deleteSong(id);
    if (result.success) {
      setMessage({ type: "success", text: "楽曲を削除しました" });
    } else {
      setMessage({ type: "error", text: result.error || "削除に失敗しました" });
    }
  };

  const filteredMembers = members.filter((m) => m.unit_id === formData.unit_id);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={openCreateForm}
          className="px-4 py-2 bg-shiny-blue text-white rounded-lg hover:bg-shiny-blue-dark transition-colors text-sm font-medium"
        >
          楽曲を追加
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

      {isFormOpen && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-800 mb-4">
            {editingSong ? "楽曲を編集" : "楽曲を追加"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  タイトル <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shiny-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  YouTube URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={formData.youtube_url}
                  onChange={(e) =>
                    setFormData({ ...formData, youtube_url: e.target.value })
                  }
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shiny-blue"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  ユニット <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.unit_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      unit_id: e.target.value,
                      member_id: "",
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shiny-blue"
                >
                  <option value="">選択してください</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  曲タイプ <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.song_type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      song_type: e.target.value as SongType,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shiny-blue"
                >
                  {songTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              {formData.song_type === "solo" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    属性
                  </label>
                  <select
                    value={formData.attribute}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attribute: e.target.value as AttributeType | "",
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shiny-blue"
                  >
                    <option value="">なし</option>
                    {attributes.map((attr) => (
                      <option key={attr.value} value={attr.value}>
                        {attr.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {formData.song_type === "solo" && filteredMembers.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  メンバー
                </label>
                <select
                  value={formData.member_id}
                  onChange={(e) =>
                    setFormData({ ...formData, member_id: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shiny-blue"
                >
                  <option value="">選択してください</option>
                  {filteredMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Vibeタグ
              </label>
              <div className="flex flex-wrap gap-2">
                {vibeTags.map((tag) => (
                  <label
                    key={tag.id}
                    className={`px-3 py-1.5 rounded-full text-sm cursor-pointer transition-colors ${
                      formData.vibe_tag_ids.includes(tag.id)
                        ? "bg-shiny-blue text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.vibe_tag_ids.includes(tag.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            vibe_tag_ids: [...formData.vibe_tag_ids, tag.id],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            vibe_tag_ids: formData.vibe_tag_ids.filter(
                              (id) => id !== tag.id
                            ),
                          });
                        }
                      }}
                    />
                    {tag.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-shiny-blue text-white rounded-lg hover:bg-shiny-blue-dark transition-colors disabled:opacity-50 text-sm font-medium"
              >
                {isSubmitting
                  ? "保存中..."
                  : editingSong
                    ? "更新する"
                    : "追加する"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  resetForm();
                }}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">
                タイトル
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">
                ユニット
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">
                タイプ
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">
                タグ
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-slate-700">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {songs.map((song) => (
              <tr key={song.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-800">
                  {song.title}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {song.unit.name}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {songTypes.find((t) => t.value === song.song_type)?.label}
                  {song.attribute && ` (${song.attribute})`}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {song.vibe_tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag.id}
                        className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-xs"
                      >
                        {tag.name}
                      </span>
                    ))}
                    {song.vibe_tags.length > 3 && (
                      <span className="text-xs text-slate-400">
                        +{song.vibe_tags.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEditForm(song)}
                      className="px-3 py-1 text-sm text-shiny-blue-dark hover:text-shiny-blue"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(song.id)}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-700"
                    >
                      削除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {songs.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            楽曲がありません
          </div>
        )}
      </div>
    </div>
  );
}
