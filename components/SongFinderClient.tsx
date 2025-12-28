"use client";

import { useState, useEffect, useRef } from "react";
import { useFilterState } from "@/lib/hooks/useFilterState";
import { getSongs, getSongCounts } from "@/lib/queries";
import type {
  Unit,
  VibeTag,
  SongWithRelations,
  AttributeType,
} from "@/lib/types/database";
import { SearchBar } from "./SearchBar";
import { UnitSelector } from "./UnitSelector";
import { AttributeSelector } from "./AttributeSelector";
import { VibeTagSelector } from "./VibeTagSelector";
import { SongList } from "./SongList";

interface SongFinderClientProps {
  initialUnits: Unit[];
  initialVibeTags: VibeTag[];
}

export function SongFinderClient({
  initialUnits,
  initialVibeTags,
}: SongFinderClientProps) {
  const {
    unitSlug,
    attribute,
    vibeTagSlugs,
    searchQuery,
    toggleUnit,
    toggleAttribute,
    toggleVibeTag,
    setSearchQuery,
    clearFilters,
  } = useFilterState();

  const [songs, setSongs] = useState<SongWithRelations[]>([]);
  const [counts, setCounts] = useState<{
    units: Record<string, number>;
    attributes: Record<AttributeType, number>;
    vibeTags: Record<string, number>;
  }>({
    units: {},
    attributes: { stella: 0, luna: 0, sol: 0 },
    vibeTags: {},
  });
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const isFirstMount = useRef(true);

  const vibeTagKey = vibeTagSlugs.join(",");

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      if (isFirstMount.current) {
        setIsInitialLoading(true);
      } else {
        setIsFetching(true);
      }

      try {
        const [songsResult, countsResult] = await Promise.all([
          getSongs({
            unitSlug: unitSlug ?? undefined,
            attribute: attribute ?? undefined,
            vibeTagSlugs: vibeTagSlugs.length > 0 ? vibeTagSlugs : undefined,
            searchQuery: searchQuery || undefined,
          }),
          getSongCounts({
            unitSlug: unitSlug ?? undefined,
            attribute: attribute ?? undefined,
            vibeTagSlugs: vibeTagSlugs.length > 0 ? vibeTagSlugs : undefined,
            searchQuery: searchQuery || undefined,
          }),
        ]);

        if (!cancelled) {
          setSongs(songsResult);
          setCounts(countsResult);
        }
      } finally {
        if (!cancelled) {
          setIsInitialLoading(false);
          setIsFetching(false);
          isFirstMount.current = false;
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitSlug, attribute, vibeTagKey, searchQuery]);

  const hasActiveFilters =
    unitSlug !== null ||
    attribute !== null ||
    vibeTagSlugs.length > 0 ||
    searchQuery !== "";

  return (
    <div className="space-y-6">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <UnitSelector
        units={initialUnits}
        counts={counts.units}
        selectedSlug={unitSlug}
        onSelect={toggleUnit}
      />

      <AttributeSelector
        counts={counts.attributes}
        selectedAttribute={attribute}
        onSelect={toggleAttribute}
      />

      <VibeTagSelector
        vibeTags={initialVibeTags}
        counts={counts.vibeTags}
        selectedSlugs={vibeTagSlugs}
        onToggle={toggleVibeTag}
      />

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-sm text-shiny-blue-dark hover:text-shiny-blue"
        >
          フィルターをクリア
        </button>
      )}

      {isInitialLoading ? (
        <div className="py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="aspect-video bg-slate-200" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-1/2" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-slate-100 rounded-full w-16" />
                    <div className="h-6 bg-slate-100 rounded-full w-12" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`transition-opacity duration-200 ${isFetching ? "opacity-50" : "opacity-100"}`}>
          <SongList songs={songs} />
        </div>
      )}
    </div>
  );
}
