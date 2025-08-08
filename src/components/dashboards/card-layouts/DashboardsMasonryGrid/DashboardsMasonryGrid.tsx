'use client';

import { useEffect, useMemo } from 'react';
import { DashboardCard } from '@/components/dashboards/cards/DashboardCard/DashboardCard';
import { AddDashboardCard } from '@/components/dashboards/cards/AddDashboardCard';
import { CardItemBase, MasonryVirtualWindow } from '@/components/molecules/VirtualizedGrid/MasonryVirtualizedGrid';
import { useDashboardStore } from '@/stores/resources/dashboardStore/useDashboardStore';
import { useShallow } from 'zustand/shallow';


interface DashboardCardItem extends CardItemBase {
  createdAt: string;
  lastUpdatedAt: string;
}

export function DashboardsMasonryGrid() {
  const dashboardsObj = useDashboardStore(useShallow((s) => s.items));
  const hasHydrated = useDashboardStore(s => s.hasHydrated)

  useEffect(() => {
    if (!hasHydrated) return;
  }, [hasHydrated]);

  const items: DashboardCardItem[] = useMemo(() => {
    return Object.values(dashboardsObj).map(n => ({
      id: n.id,
      title: n.name.trim() || 'Untitled',
      subtitle: n.description.trim(),
      createdAt: n.createdAt,
      lastUpdatedAt: n.updatedAt
    }))
  }, [dashboardsObj])

  return (
    <MasonryVirtualWindow<DashboardCardItem>
      aria-label="Notes masonry"
      items={items}
      estimatedCardHeight={180}
      overscanScreens={1}
      renderAddNew={() => <AddDashboardCard />}
      renderCard={item => (
        <DashboardCard
          key={item.id}
          id={item.id}
          name={item.title}
          description={item.subtitle ?? ""}
          createdAt={item.createdAt}
          updatedAt={item.lastUpdatedAt}
          onClick={item.onClick}
        />
      )}
    />
  );
}
