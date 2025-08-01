"use client";

import { useMemo, useState, useCallback } from "react";
import { useDebouncedQuery, useFuzzyFilter, useDateRange } from "@/hooks";
import { useSort } from "@/hooks/controls/useSort";
import { applyDateRangeFilter } from "@/utils/applyDateRangeFilter";

export interface NoteLike {
  id: string;
  title?: string;
  excerpt?: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  content?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function useNotesSearchSort(
  allNotes: NoteLike[],
  opts?: {
    initialQuery?: string;
    initialTags?: string[];
    initialDateRange?: { from?: string; to?: string };
    initialSortKey?: "updatedAt" | "createdAt" | "name";
    initialSortDir?: "asc" | "desc";
  }
) {
  const {
    initialQuery = "",
    initialTags = [],
    initialDateRange = {},
    initialSortKey = "updatedAt",
    initialSortDir = "desc",
  } = opts || {};

  const {
    rawQuery,
    query: debouncedQuery,
    setRawQuery,
    clear: clearQuery,
    isSearching,
  } = useDebouncedQuery({ debounceMs: 180, initial: initialQuery });

  const {
    sortKey,
    setSortKey,
    sortDir,
    toggleSortDir,
    reset: resetSort,
  } = useSort(initialSortKey, initialSortDir);

  // date range
  const {
    dateRange,
    setDateRange,
    reset: resetDateRange,
  } = useDateRange(initialDateRange);

  // tags
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const resetTags = useCallback(() => setSelectedTags([]), []);

  // fuzzy over title, excerpt, and content
  const withAggregatedText = useMemo(
    () =>
      allNotes.map((n) => ({
        ...n,
        name: n.title || "",
        description: [n.excerpt || "", n.content || ""]
          .filter(Boolean)
          .join(" "),
      })),
    [allNotes]
  );

  const fuzzyFiltered = useFuzzyFilter(withAggregatedText, debouncedQuery, {
    keys: ["name", "description", "tags"],
    threshold: 0.35,
    ignoreLocation: true,
  });

  const tagFiltered = useMemo(() => {
    if (selectedTags.length === 0) return fuzzyFiltered;
    return fuzzyFiltered.filter((n) => {
      const noteTags = n.tags || [];
      return selectedTags.every((t) => noteTags.includes(t));
    });
  }, [fuzzyFiltered, selectedTags]);

  const dateFiltered = useMemo(
    () =>
      applyDateRangeFilter(
        tagFiltered,
        dateRange,
        sortKey === "createdAt" ? "createdAt" : "updatedAt"
      ),
    [tagFiltered, dateRange, sortKey]
  );

  const sorted = useMemo(() => {
    return [...dateFiltered].sort((a, b) => {
      if (sortKey === "name") {
        const aName = (a.title || "").toString();
        const bName = (b.title || "").toString();
        const cmp = aName.localeCompare(bName);
        return sortDir === "asc" ? cmp : -cmp;
      }
      const aTime = a[sortKey] ? new Date(a[sortKey]!).getTime() : 0;
      const bTime = b[sortKey] ? new Date(b[sortKey]!).getTime() : 0;
      const diff = aTime - bTime;
      return sortDir === "asc" ? diff : -diff;
    });
  }, [dateFiltered, sortKey, sortDir]);

  const resetAll = useCallback(() => {
    clearQuery();
    resetSort();
    resetDateRange();
    resetTags();
  }, [clearQuery, resetSort, resetDateRange, resetTags]);

  return {
    filtered: sorted,
    // query
    rawQuery,
    query: debouncedQuery,
    setRawQuery,
    clearQuery,
    isSearching,
    // sort
    sortKey,
    setSortKey,
    sortDir,
    toggleSortDir,
    resetSort,
    // date
    dateRange,
    setDateRange,
    resetDateRange,
    // tags
    selectedTags,
    setSelectedTags,
    resetTags,
    // all
    resetAll,
  };
}
