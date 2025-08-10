"use client";

import { Dashboard } from "@/stores";
import { useDebouncedQuery, useFuzzyFilter } from "@/hooks/controls/search";

/** Options for useDashboardSearch */
export interface UseDashboardSearchOptions {
  debounceMs?: number;
}

/** Return type for useDashboardSearch */
export interface UseDashboardSearchResult {
  rawQuery: string;
  query: string;
  setRawQuery: (value: string) => void;
  clear: () => void;
  isSearching: boolean;
  results: Dashboard[];
}

/**
 * Returns debounced, fuzzy-search results for dashboards.
 */
export function useDashboardSearch(
  dashboards: Dashboard[] = [],
  { debounceMs = 180 }: UseDashboardSearchOptions = {}
): UseDashboardSearchResult {
  const { rawQuery, query, setRawQuery, clear, isSearching } = useDebouncedQuery({
    debounceMs,
    initial: "",
  });

  const fuzzyResults = useFuzzyFilter(dashboards, query ?? "", {
    keys: ["name", "description"],
    threshold: 0.7,
    findAllMatches: true,
    ignoreLocation: true,
  });

  // Defensive: Always an array
  const results = Array.isArray(fuzzyResults) ? fuzzyResults : [];

  return {
    rawQuery,
    query,
    setRawQuery,
    clear,
    isSearching,
    results,
  };
}
