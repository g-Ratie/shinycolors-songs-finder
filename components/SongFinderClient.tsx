"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
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
      setSongs(songsResult);
      setCounts(countsResult);
    } finally {
      setIsLoading(false);
    }
  }, [unitSlug, attribute, vibeTagSlugs, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
          className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          フィルターをクリア
        </button>
      )}

      {isLoading ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          読み込み中...
        </div>
      ) : (
        <SongList songs={songs} />
      )}
    </div>
  );
}
