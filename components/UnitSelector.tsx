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
      <h2 className="text-sm font-medium text-slate-600">
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
                    ? "bg-shiny-blue/20 border-shiny-blue shadow-sm"
                    : "bg-white border-shiny-blue/20 hover:border-shiny-blue/50"
                }
              `}
            >
              {Icon ? (
                <Icon size={24} />
              ) : (
                <span className="w-6 h-6 flex items-center justify-center text-xs bg-shiny-blue/20 rounded">
                  {unit.name.charAt(0)}
                </span>
              )}
              <span className="text-sm font-medium text-slate-700">{unit.name}</span>
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
