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
    <div className="space-y-3">
      <h2 className="text-sm font-bold text-slate-700 tracking-wide">
        Vibe
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
                px-4 py-2 rounded-full text-sm font-medium
                border-2 transition-all duration-200
                ${
                  isSelected
                    ? "bg-gradient-to-r from-shiny-blue to-shiny-blue-dark text-white border-shiny-blue shadow-md scale-105"
                    : "glass-card text-slate-600 border-transparent hover:border-shiny-blue/50 hover:text-shiny-blue-dark"
                }
              `}
            >
              {tag.name}
              <span
                className={`ml-1.5 text-xs ${
                  isSelected ? "text-white/80" : "text-slate-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
