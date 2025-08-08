"use client";

import { useEffect, useState } from "react";
import { useDashboardStore } from "@/stores/dashboardStore/useDashboardStore";
// import { useGridStore } from "@/stores/dashboard/gridStore";
import { FullPageLoading } from "@/components/loading/skeletons/FullPageLoading/FullPageLoading";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SidebarProvider } from "@/components/atoms/ui/sidebar/SidebarProvider";
import { useShallow } from "zustand/shallow";
import { GridProvider } from "@/rgl/providers/useGrid";
import { useGridStore } from "@/rgl/stores";

function DashboardScopedProviders({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const selectDashboard = useDashboardStore(s => s.setSelected)
  const selected = useDashboardStore(useShallow(s => s.selected['dashboard']))
  const grid = useGridStore(useShallow(s => s.findByParent(id, "dashboard")))

  useEffect(() => {
    if (!id) return
    if (id !== selected) selectDashboard("dashboard", id);
  }, [id, selectDashboard, selected]);

  return (
    <ThemeProvider scope="dashboard" entityId={id}>
      <GridProvider gridId={grid?.gridId}>
        <SidebarProvider
          id={id}
          sidebarId={`dashboard:${id}`}
          onOpenChange={(open: boolean) => !open && true}
          data-id={`dashboard-${id}`}
          collapsible="icon"
        >
          {children}
        </SidebarProvider>
      </GridProvider>
    </ThemeProvider>
  );
}

export function DashboardShowProviders({ dashboardId, children }: { dashboardId: string; children: React.ReactNode }) {
  const dashboard = useDashboardStore(useShallow(state => state.items[dashboardId]))
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (!dashboardId) return;
    setCanRender(true)
  }, [dashboardId]);

  useEffect(() => {
    if (dashboard) {
      console.log("dashboard", dashboard)
    }
  }, [dashboard])

  if (!dashboardId) return null;
  if (!canRender) return <FullPageLoading message="Loading Dashboard..." />;

  return <DashboardScopedProviders id={dashboardId}>{children}</DashboardScopedProviders>;
}
