"use client";

import type { VibeTag } from "@/lib/types/database";

interface VibeTagSelectorProps {
  vibeTags: VibeTag[];
  counts: Record<string, number>;
  selectedSlugs: string[];
  onToggle: (slug: string) => void;
}

export function VibeTagSelector({
  vibeTags,
  counts,
  selectedSlugs,
  onToggle,
}: VibeTagSelectorProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-medium text-slate-600">
        その他要素（Vibe）
        {selectedSlugs.length > 0 && (
          <span className="ml-2 text-xs text-shiny-blue-dark">
            {selectedSlugs.length}件選択中 - AND条件
          </span>
        )}
      </h2>
      <div className="flex flex-wrap gap-2">
        {vibeTags.map((tag) => {
          const count = counts[tag.slug] ?? 0;
          const isSelected = selectedSlugs.includes(tag.slug);

          return (
            <button
              key={tag.id}
              onClick={() => onToggle(tag.slug)}
              className={`
                px-3 py-1.5 rounded-full text-sm
                border transition-all
                ${
                  isSelected
                    ? "bg-shiny-blue text-white border-shiny-blue"
                    : "bg-white text-slate-700 border-shiny-blue/30 hover:border-shiny-blue"
                }
              `}
            >
              {tag.name}
              <span
                className={`ml-1 text-xs ${isSelected ? "text-white/70" : "text-slate-400"}`}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
