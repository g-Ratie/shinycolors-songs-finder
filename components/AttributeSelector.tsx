"use client";

import type { AttributeType } from "@/lib/types/database";

const attributes: { value: AttributeType; label: string; color: string }[] = [
  { value: "stella", label: "Stella", color: "bg-pink-500" },
  { value: "luna", label: "Luna", color: "bg-blue-500" },
  { value: "sol", label: "Sol", color: "bg-yellow-500" },
];

interface AttributeSelectorProps {
  counts: Record<AttributeType, number>;
  selectedAttribute: AttributeType | null;
  onSelect: (attr: AttributeType) => void;
}

export function AttributeSelector({
  counts,
  selectedAttribute,
  onSelect,
}: AttributeSelectorProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-medium text-slate-600">
        属性 <span className="text-xs">※ソロ曲のみ</span>
      </h2>
      <div className="flex flex-wrap gap-2">
        {attributes.map(({ value, label, color }) => {
          const count = counts[value] ?? 0;
          const isSelected = selectedAttribute === value;

          return (
            <button
              key={value}
              onClick={() => onSelect(value)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg
                border transition-all
                ${
                  isSelected
                    ? "ring-2 ring-offset-2 ring-shiny-blue"
                    : ""
                }
                bg-white border-shiny-blue/20 hover:border-shiny-blue/50
              `}
            >
              <span className={`w-3 h-3 rounded-full ${color}`} />
              <span className="text-sm font-medium text-slate-700">{label}</span>
              <span className="text-xs text-slate-500">
                ({count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
