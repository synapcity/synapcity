"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/atoms/ui/sidebar";
import { useDashboardStore } from "@/stores/resources/dashboardStore/useDashboardStore";
import { usePanels } from "@/hooks";
import { useShallow } from "zustand/shallow";
import { SidebarRenderer } from "../SidebarRenderer";
import Link from "next/link";

interface DashboardsSidebarProps {
  id: string;
}

export function DashboardsSidebar(
  { id, ...props }: DashboardsSidebarProps & React.ComponentProps<typeof Sidebar>
) {
  const currentDashboard = useDashboardStore(useShallow(s => s.getResourceById(id)));
  const createDashboard = useDashboardStore(s => s.addResource);
  const dashboardExists = Boolean(currentDashboard);
  const { panels, activePanel } = usePanels("dashboard", id);

  React.useEffect(() => {
    if (!dashboardExists) {
      console.warn(`Dashboard ${id} not found—creating a stub.`);
      createDashboard({ id });
    }
  }, [dashboardExists, id, createDashboard]);

  return (
    <Sidebar
      variant="container"
      collapsible="icon"
      side="right"
      className="
        bg-[var(--background)] text-[var(--foreground)]
        flex flex-col flex-1
        h-full min-h-0
        overflow-hidden
      "
      {...props}
    >
      {activePanel ? (
        <SidebarContent
          className="
            bg-[var(--sidebar-background)]
            flex-1 min-h-0
            overflow-y-auto
            p-2
            m-2
          "
        >
          <SidebarRenderer scope="dashboard" id={id} />
        </SidebarContent>
      ) : (
        <SidebarContent
          className="
            bg-[var(--sidebar-background)] text-[var(--sidebar-foreground)]
            flex-1 min-h-0
            overflow-hidden
            flex flex-col
          "
        >
          <SidebarHeader className="gap-3.5 border-b p-4 shrink-0">
            <span className="text-foreground text-base font-medium">Dashboards</span>
          </SidebarHeader>

          {/* Scrollable list area */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            <SidebarGroup>
              <SidebarGroupContent>
                {panels.map((item) => (
                  <Link
                    href="#"
                    key={item.id}
                    className="
                      bg-(--sidebar-background) text-(--sidebar-foreground)
                      data-[active=true]:text-(--sidebar-foreground)
                      hover:bg-(--sidebar-accent) hover:text-(--sidebar-accent-foreground)
                      flex flex-col gap-2 border-b p-4 text-sm leading-tight last:border-b-0
                    "
                  >
                    <div className="flex w-full items-center gap-2">
                      <span>{item.label}</span>
                      {item.href && <span className="ml-auto text-xs">{item.href}</span>}
                    </div>
                  </Link>
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        </SidebarContent>
      )}
    </Sidebar>
  );
}
