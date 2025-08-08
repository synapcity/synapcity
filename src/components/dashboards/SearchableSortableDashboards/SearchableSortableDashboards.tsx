'use client';

import * as React from 'react';
import type { Dashboard } from '@/stores/resources/dashboardStore/dashboard-schema';
import { useDateRange, useDashboardSearch, useSort, useUrlStateSync } from '@/hooks';
import { applyDateRangeFilter } from '@/utils/applyDateRangeFilter';
import dynamic from 'next/dynamic';
import { CardItemBase } from '@/hooks/useLazyMountWithExpiry';
import { DashboardsControlsBar } from './DashboardControlsBar';
import { useMemo } from 'react';

const SkeletonOrLoading = dynamic(() => import("@/components/loading/SkeletonOrLoading/SkeletonOrLoading").then(mod => mod.SkeletonOrLoading), { ssr: true })

const MasonryVirtualWindow = dynamic(() => import("@/components/molecules/VirtualizedGrid/MasonryVirtualizedGrid").then(mod => mod.MasonryVirtualWindow), { ssr: false, loading: ({ isLoading }) => <SkeletonOrLoading isLoading={isLoading} /> })
const AddDashboardCard = dynamic(() => import("@/components/dashboards/cards/AddDashboardCard").then(mod => mod.AddDashboardCard), { ssr: false })

export type SearchableSortableDashboardsProps = {
  dashboards: Dashboard[];
  renderCard: (item: Dashboard) => React.ReactNode;
};

export function SearchableSortableDashboards({
  dashboards,
  renderCard,
}: SearchableSortableDashboardsProps) {
  const {
    rawQuery,
    setRawQuery,
    query,
    clear: clearSearch,
    isSearching,
    results: searchedRaw
  } = useDashboardSearch(dashboards, { debounceMs: 250 });

  const searched = useMemo(() => searchedRaw ?? [], [searchedRaw]);

  const { sortKey, setSortKey, sortDir, toggleSortDir, reset: resetSort } = useSort();
  const { dateRange, setDateRange, reset: resetDateRange } = useDateRange();

  const dateFiltered = React.useMemo(
    () =>
      applyDateRangeFilter(
        searched,
        dateRange,
        sortKey === 'createdAt' ? 'createdAt' : 'updatedAt'
      ),
    [searched, dateRange, sortKey]
  );

  const sorted = React.useMemo(() => {
    return [...(dateFiltered ?? [])].sort((a, b) => {
      if (sortKey === 'name') {
        const aName = (a.name || '').toString();
        const bName = (b.name || '').toString();
        const cmp = aName.localeCompare(bName);
        return sortDir === 'asc' ? cmp : -cmp;
      }
      const aTime = a[sortKey] ? new Date(a[sortKey]!).getTime() : 0;
      const bTime = b[sortKey] ? new Date(b[sortKey]!).getTime() : 0;
      const diff = aTime - bTime;
      return sortDir === 'asc' ? diff : -diff;
    });
  }, [dateFiltered, sortKey, sortDir]);

  useUrlStateSync({
    q: query || undefined,
    sort: sortKey,
    dir: sortDir,
    from: dateRange.from,
    to: dateRange.to,
  });

  const resetAll = () => {
    clearSearch();
    resetSort();
    resetDateRange();
  };

  return (
    <div className="flex flex-col gap-4 min-h-0">
      <DashboardsControlsBar
        searchTerm={rawQuery}
        onSearchChange={setRawQuery}
        sortKey={sortKey}
        onSortKeyChange={setSortKey}
        sortDir={sortDir}
        toggleSortDir={toggleSortDir}
        dateFrom={dateRange.from}
        dateTo={dateRange.to}
        onDateRangeChange={({ from, to }) => setDateRange({ from, to })}
        clearAll={resetAll}
        isSearching={isSearching}
      />

      <MasonryVirtualWindow
        items={sorted as Dashboard[]}
        renderCard={(item: CardItemBase) => renderCard(item as Dashboard)}
        estimatedCardHeight={220}
        overscanScreens={1}
        renderAddNew={() => <AddDashboardCard />}
      />

      {sorted.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-6">
          No dashboards match your search / sort criteria.
        </div>
      )}
    </div>
  );
}
