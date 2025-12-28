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
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        その他要素（Vibe）
        {selectedSlugs.length > 0 && (
          <span className="ml-2 text-xs text-blue-500">
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
                    ? "bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
                }
              `}
            >
              {isSelected && <span className="mr-1">✓</span>}
              {tag.name}
              <span
                className={`ml-1 text-xs ${isSelected ? "text-blue-200" : "text-gray-400"}`}
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
