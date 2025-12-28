"use client";

import { useState } from "react";
import type { Member, Unit } from "@/lib/types/database";
import { createMember, updateMember, deleteMember } from "./actions";

interface MemberListProps {
  initialMembers: Member[];
  units: Unit[];
}

interface UnitAssignment {
  unitId: string;
  isPrimary: boolean;
}

interface MemberFormData {
  name: string;
  sortOrder: number;
  unitAssignments: UnitAssignment[];
}

export function MemberList({ initialMembers, units }: MemberListProps) {
  const [members, setMembers] = useState(initialMembers);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<MemberFormData>({
    name: "",
    sortOrder: members.length + 1,
    unitAssignments: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const resetForm = () => {
    setFormData({
      name: "",
      sortOrder: members.length + 1,
      unitAssignments: [],
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    setMessage(null);

    const result = await createMember(
      formData.name.trim(),
      formData.sortOrder,
      formData.unitAssignments
    );

    if (result.success) {
      setMessage({ type: "success", text: "メンバーを追加しました" });
      resetForm();
      window.location.reload();
    } else {
      setMessage({ type: "error", text: result.error || "エラーが発生しました" });
    }

    setIsSubmitting(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !formData.name.trim()) return;

    setIsSubmitting(true);

    const result = await updateMember(
      editingId,
      formData.name.trim(),
      formData.sortOrder,
      formData.unitAssignments
    );

    if (result.success) {
      setMessage({ type: "success", text: "メンバーを更新しました" });
      resetForm();
      window.location.reload();
    } else {
      setMessage({ type: "error", text: result.error || "更新に失敗しました" });
    }

    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`「${name}」を削除しますか？`)) {
      return;
    }

    const result = await deleteMember(id);

    if (result.success) {
      setMembers(members.filter((m) => m.id !== id));
      setMessage({ type: "success", text: "メンバーを削除しました" });
    } else {
      setMessage({ type: "error", text: result.error || "削除に失敗しました" });
    }
  };

  const startEdit = (member: Member) => {
    const memberUnits = member.member_units || [];
    setEditingId(member.id);
    setFormData({
      name: member.name,
      sortOrder: member.sort_order,
      unitAssignments: memberUnits.map((mu) => ({
        unitId: mu.unit_id,
        isPrimary: mu.is_primary,
      })),
    });
    setShowForm(true);
  };

  const toggleUnit = (unitId: string) => {
    const existing = formData.unitAssignments.find((ua) => ua.unitId === unitId);
    if (existing) {
      setFormData({
        ...formData,
        unitAssignments: formData.unitAssignments.filter((ua) => ua.unitId !== unitId),
      });
    } else {
      setFormData({
        ...formData,
        unitAssignments: [
          ...formData.unitAssignments,
          { unitId, isPrimary: formData.unitAssignments.length === 0 },
        ],
      });
    }
  };

  const setPrimaryUnit = (unitId: string) => {
    setFormData({
      ...formData,
      unitAssignments: formData.unitAssignments.map((ua) => ({
        ...ua,
        isPrimary: ua.unitId === unitId,
      })),
    });
  };

  const getUnitNames = (member: Member): string => {
    const memberUnits = member.member_units || [];
    if (memberUnits.length === 0) return "未所属";
    return memberUnits
      .map((mu) => {
        const unit = mu.unit;
        const primary = mu.is_primary ? " (主)" : "";
        return unit ? `${unit.name}${primary}` : "";
      })
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="space-y-6">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-shiny-blue text-white rounded-lg hover:bg-shiny-blue-dark transition-colors text-sm font-medium"
        >
          メンバーを追加
        </button>
      )}

      {showForm && (
        <form
          onSubmit={editingId ? handleUpdate : handleCreate}
          className="bg-white p-6 rounded-lg border border-slate-200 space-y-4"
        >
          <h2 className="text-lg font-medium text-slate-800">
            {editingId ? "メンバー編集" : "新規メンバー"}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                名前
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shiny-blue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                表示順
              </label>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) =>
                  setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shiny-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              所属ユニット
            </label>
            <div className="grid grid-cols-2 gap-2">
              {units.map((unit) => {
                const isSelected = formData.unitAssignments.some(
                  (ua) => ua.unitId === unit.id
                );
                const isPrimary = formData.unitAssignments.find(
                  (ua) => ua.unitId === unit.id
                )?.isPrimary;

                return (
                  <div
                    key={unit.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      isSelected
                        ? "border-shiny-blue bg-shiny-blue-light/20"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    onClick={() => toggleUnit(unit.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-800">{unit.name}</span>
                      {isSelected && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPrimaryUnit(unit.id);
                          }}
                          className={`text-xs px-2 py-0.5 rounded ${
                            isPrimary
                              ? "bg-shiny-blue text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {isPrimary ? "主所属" : "主に設定"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-shiny-blue text-white rounded-lg hover:bg-shiny-blue-dark transition-colors disabled:opacity-50 text-sm font-medium"
            >
              {isSubmitting ? "保存中..." : editingId ? "更新" : "追加"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 text-sm"
            >
              キャンセル
            </button>
          </div>
        </form>
      )}

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
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between px-4 py-3"
          >
            <div>
              <span className="text-slate-800 font-medium">{member.name}</span>
              <span className="ml-2 text-xs text-slate-400">
                (順: {member.sort_order})
              </span>
              <div className="text-xs text-slate-500 mt-0.5">
                {getUnitNames(member)}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(member)}
                className="px-3 py-1 text-sm text-shiny-blue hover:text-shiny-blue-dark"
              >
                編集
              </button>
              <button
                onClick={() => handleDelete(member.id, member.name)}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-700"
              >
                削除
              </button>
            </div>
          </div>
        ))}
        {members.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            メンバーがいません
          </div>
        )}
      </div>
    </div>
  );
}
