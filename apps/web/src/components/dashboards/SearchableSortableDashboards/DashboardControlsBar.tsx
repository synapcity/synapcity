"use client";

import * as React from "react";
import type { SortKey, SortDir } from "../../atoms/controls";
import { SkeletonOrLoading } from "@/components/loading";
import dynamic from "next/dynamic";
import { DropdownMenuSkeleton } from "@/components/loading/skeletons/DropdownMenuSkeleton";

export interface FilterChip {
  label: string;
  active: boolean;
  onToggle: () => void;
}

interface Props {
  searchTerm: string;
  onSearchChange: (v: string) => void;
  sortKey: SortKey;
  onSortKeyChange: (k: SortKey) => void;
  sortDir: SortDir;
  toggleSortDir: () => void;
  dateFrom?: string;
  dateTo?: string;
  onDateRangeChange: (r: { from?: string; to?: string }) => void;
  clearAll?: () => void;
  isSearching?: boolean;
}

const SortControl = dynamic(
  () =>
    import("@/components/atoms/controls/SortControl/SortControl").then((mod) => mod.SortControl),
  {
    ssr: false,
    loading: ({ isLoading }) => (
      <SkeletonOrLoading isLoading={isLoading} skeleton={<DropdownMenuSkeleton />} />
    ),
  }
);
const DateRangePicker = dynamic(
  () => import("@/components/atoms/controls/DateRangePicker").then((mod) => mod.DateRangePicker),
  {
    ssr: false,
    loading: ({ isLoading }) => (
      <SkeletonOrLoading isLoading={isLoading} skeleton={<DropdownMenuSkeleton />} />
    ),
  }
);
const SearchInput = dynamic(
  () => import("@/components/atoms/controls/SearchInput").then((mod) => mod.SearchInput),
  { ssr: false, loading: ({ isLoading }) => <SkeletonOrLoading isLoading={isLoading} /> }
);

export function DashboardsControlsBar({
  searchTerm,
  onSearchChange,
  sortKey,
  onSortKeyChange,
  sortDir,
  toggleSortDir,
  dateFrom,
  dateTo,
  onDateRangeChange,
  clearAll,
  isSearching = false,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <SearchInput
        value={searchTerm}
        onChange={onSearchChange}
        isLoading={isSearching}
        onClear={() => onSearchChange("")}
      />

      <SortControl
        sortDir={sortDir}
        sortKey={sortKey}
        onKeyChange={onSortKeyChange}
        onDirToggle={toggleSortDir}
      />

      <DateRangePicker
        from={dateFrom}
        to={dateTo}
        onChange={({ from, to }) => onDateRangeChange({ from, to })}
      />

      {clearAll && (
        <button
          aria-label="Clear all filters"
          onClick={clearAll}
          className="text-sm underline ml-auto"
        >
          Reset
        </button>
      )}
    </div>
  );
}
