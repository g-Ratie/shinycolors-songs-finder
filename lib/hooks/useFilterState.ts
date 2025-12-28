"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { AttributeType } from "../types/database";

export interface FilterState {
  unitSlug: string | null;
  attribute: AttributeType | null;
  vibeTagSlugs: string[];
}

export function useFilterState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const state: FilterState = useMemo(
    () => ({
      unitSlug: searchParams.get("unit"),
      attribute: searchParams.get("attr") as AttributeType | null,
      vibeTagSlugs: searchParams.get("v")?.split(",").filter(Boolean) ?? [],
    }),
    [searchParams]
  );

  const updateFilters = useCallback(
    (updates: Partial<FilterState>) => {
      const newState = { ...state, ...updates };
      const params = new URLSearchParams();

      if (newState.unitSlug) {
        params.set("unit", newState.unitSlug);
      }
      if (newState.attribute) {
        params.set("attr", newState.attribute);
      }
      if (newState.vibeTagSlugs.length > 0) {
        params.set("v", newState.vibeTagSlugs.join(","));
      }

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [state, router, pathname]
  );

  const toggleUnit = useCallback(
    (slug: string) => {
      updateFilters({
        unitSlug: state.unitSlug === slug ? null : slug,
      });
    },
    [state.unitSlug, updateFilters]
  );

  const toggleAttribute = useCallback(
    (attr: AttributeType) => {
      updateFilters({
        attribute: state.attribute === attr ? null : attr,
      });
    },
    [state.attribute, updateFilters]
  );

  const toggleVibeTag = useCallback(
    (slug: string) => {
      const newVibeTags = state.vibeTagSlugs.includes(slug)
        ? state.vibeTagSlugs.filter((s) => s !== slug)
        : [...state.vibeTagSlugs, slug];
      updateFilters({ vibeTagSlugs: newVibeTags });
    },
    [state.vibeTagSlugs, updateFilters]
  );

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return {
    ...state,
    toggleUnit,
    toggleAttribute,
    toggleVibeTag,
    clearFilters,
  };
}
