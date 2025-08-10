"use client";

import { useState, useCallback } from "react";

export type SortKey = "updatedAt" | "createdAt" | "name";
export type SortDir = "asc" | "desc";

/**
 * Simple sort state abstraction with toggle.
 */
export function useSort(initialKey: SortKey = "updatedAt", initialDir: SortDir = "desc") {
  const [sortKey, setSortKey] = useState<SortKey>(initialKey);
  const [sortDir, setSortDir] = useState<SortDir>(initialDir);

  const toggleSortDir = useCallback(() => {
    setSortDir((d) => (d === "asc" ? "desc" : "asc"));
  }, []);

  const reset = useCallback(() => {
    setSortKey(initialKey);
    setSortDir(initialDir);
  }, [initialKey, initialDir]);

  return {
    sortKey,
    setSortKey,
    sortDir,
    toggleSortDir,
    reset,
  };
}
