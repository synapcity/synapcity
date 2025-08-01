'use client';

import React, { useCallback, useMemo } from 'react';
import { useDashboardStore } from '@/stores/dashboardStore/useDashboardStore';
import type { Dashboard } from '@/schemas/resources/dashboard-schema';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';
import dynamic from 'next/dynamic';

const SkeletonOrLoading = dynamic(() => import("@/components/loading/SkeletonOrLoading/SkeletonOrLoading").then(mod => mod.SkeletonOrLoading), { ssr: true })
const SearchableSortableDashboards = dynamic(() => import("@/components/dashboards/SearchableSortableDashboards/SearchableSortableDashboards").then(mod => mod.SearchableSortableDashboards), { ssr: false, loading: ({ isLoading }) => <SkeletonOrLoading isLoading={isLoading} /> })
const DashboardCard = dynamic(() => import("@/components/dashboards/cards/DashboardCard/DashboardCard").then(mod => mod.DashboardCard), { ssr: false, loading: ({ isLoading }) => <SkeletonOrLoading isLoading={isLoading} /> })

export default function DashboardsIndex() {
  const router = useRouter();

  const dashboardsObj = useDashboardStore(useShallow((s) => s.items));
  const dashboards = useMemo(() => Object.values(dashboardsObj), [dashboardsObj]);

  const renderCard = useCallback(
    (dashboard: Dashboard) => (
      <div
        onClick={() => {
          router.push(`/home/dashboards/${dashboard.id}`);
        }}
      >
        <DashboardCard dashboard={dashboard} />
      </div>
    ),
    [router]
  );


  return (
    <div className="flex-1 min-h-0 p-4 flex flex-col">
      <SearchableSortableDashboards dashboards={dashboards} renderCard={renderCard} />
    </div>
  );
}
