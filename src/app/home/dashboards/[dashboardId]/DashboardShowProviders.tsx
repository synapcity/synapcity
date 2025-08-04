"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDashboardStore } from "@/stores/dashboardStore/useDashboardStore";
// import { useGridStore } from "@/stores/dashboard/gridStore";
import { FullPageLoading } from "@/components/loading/skeletons/FullPageLoading/FullPageLoading";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SidebarProvider } from "@/components/atoms/ui/sidebar/SidebarProvider";
import { useShallow } from "zustand/shallow";

function DashboardScopedProviders({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  // const selectDashboard = useDashboardStore((s) => s.selectDashboard);

  // useEffect(() => {
  //   if (id) selectDashboard(id);
  // }, [id, selectDashboard]);

  return (
    <ThemeProvider scope="dashboard" entityId={id}>
      <SidebarProvider
        id={id}
        sidebarId="dashboard-sidebar"
        // scope="dashboard"
        defaultOpen={false}
        data-id={`dashboard-${id}`}
        style={{ "--sidebar-width": "350px", height: "100%" } as React.CSSProperties}
      >
        {children}
      </SidebarProvider>
    </ThemeProvider>
  );
}

export function DashboardShowProviders({ children }: { children: React.ReactNode }) {
  const { dashboardId } = useParams();
  const id = Array.isArray(dashboardId) ? dashboardId[0] : dashboardId;
  const dashboard = useDashboardStore(useShallow(state => id && state.items[id]))

  // const selectDashboard = useDashboardStore((s) => s.selectDashboard);
  // const hasHydrated = useGridStore((s) => s.hasHydrated);
  // const dashboard = useDashboardStore((s) => s.getDashboardById(id ?? ""));
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    //   const grid = useGridStore.getState();
    //   const hasLayouts = !!grid.layoutsByDashboard[id];

    //   (async () => {
    //     await selectDashboard(id);
    //     if (!hasLayouts) {
    //       grid.setWidgetsForDashboard({}, id);
    //       grid.setLayoutsByDashboard(
    //         { lg: [], md: [], sm: [], xs: [], xxs: [] },
    //         id
    //       );
    //     }
    setCanRender(true);
    // })();
  }, [id]);

  useEffect(() => {
    if (dashboard) {
      console.log("dashboard", dashboard)
    }
  }, [dashboard])
  if (!id) return null;
  if (!canRender) return <FullPageLoading message="Loading Dashboard..." />;

  return <DashboardScopedProviders id={id}>{children}</DashboardScopedProviders>;
}
