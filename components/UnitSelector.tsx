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
    <div className="space-y-3">
      <h2 className="text-sm font-bold text-slate-700 tracking-wide">
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
                flex items-center gap-2 px-4 py-2.5 rounded-xl
                border-2 transition-all duration-200
                ${
                  isSelected
                    ? "bg-gradient-to-r from-shiny-blue/30 to-shiny-blue/20 border-shiny-blue shadow-md scale-105"
                    : "glass-card border-transparent hover:border-shiny-blue/50 hover:shadow-sm"
                }
              `}
            >
              {Icon ? (
                <div className={`transition-transform duration-200 ${isSelected ? "scale-110" : ""}`}>
                  <Icon size={28} />
                </div>
              ) : (
                <span className="w-7 h-7 flex items-center justify-center text-xs font-bold bg-shiny-blue/20 text-shiny-blue-dark rounded-lg">
                  {unit.name.charAt(0)}
                </span>
              )}
              <span className={`text-sm font-medium ${isSelected ? "text-shiny-blue-dark" : "text-slate-700"}`}>
                {unit.name}
              </span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                isSelected
                  ? "bg-shiny-blue text-white"
                  : "bg-slate-100 text-slate-500"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
