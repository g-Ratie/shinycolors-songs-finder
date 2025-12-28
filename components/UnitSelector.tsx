"use client";

import {
  IlluminationStars,
  LAntica,
  HokagoClimaxGirls,
  Alstromeria,
  StrayLight,
  Shhis,
  Cometik,
} from "shinycolors-icons";
import type { Unit } from "@/lib/types/database";

const unitIconMap: Record<string, React.FC<{ size?: number | string }>> = {
  "illumination-stars": IlluminationStars,
  lantica: LAntica,
  "houkago-climax-girls": HokagoClimaxGirls,
  alstroemeria: Alstromeria,
  straylight: StrayLight,
  shhis: Shhis,
  cometik: Cometik,
};

interface UnitSelectorProps {
  units: Unit[];
  counts: Record<string, number>;
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}

export function UnitSelector({
  units,
  counts,
  selectedSlug,
  onSelect,
}: UnitSelectorProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        ユニット
      </h2>
      <div className="flex flex-wrap gap-2">
        {units.map((unit) => {
          const Icon = unitIconMap[unit.slug];
          const count = counts[unit.slug] ?? 0;
          const isSelected = selectedSlug === unit.slug;

          return (
            <button
              key={unit.id}
              onClick={() => onSelect(unit.slug)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg
                border transition-all
                ${
                  isSelected
                    ? "bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-400"
                    : "bg-white border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600"
                }
              `}
            >
              {Icon ? (
                <Icon size={24} />
              ) : (
                <span className="w-6 h-6 flex items-center justify-center text-xs bg-gray-200 dark:bg-gray-700 rounded">
                  {unit.name.charAt(0)}
                </span>
              )}
              <span className="text-sm font-medium">{unit.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
