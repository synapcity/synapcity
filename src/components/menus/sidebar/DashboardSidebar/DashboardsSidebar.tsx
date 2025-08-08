"use client";

import * as React from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupContent } from "@/components/atoms/ui/sidebar";
import { useDashboardStore } from "@/stores/dashboardStore/useDashboardStore";
import { usePanels } from "@/hooks";
import { useShallow } from "zustand/shallow";
import { SidebarRenderer } from "../SidebarRenderer";

interface DashboardsSidebarProps {
  id: string;
}

export function DashboardsSidebar({ id, ...props }: DashboardsSidebarProps & React.ComponentProps<typeof Sidebar>) {
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
        overflow-hidden
        bg-[var(--background)]
        text-[var(--foreground)]
        flex-1
        flex
        flex-col
      "
      {...props}
    >
      {activePanel ? (
        <SidebarContent className="bg-[var(--sidebar-foreground)] text-[var(--sidebar)] p-2 flex-1 min-h-0 overflow-auto">
          <SidebarRenderer scope="dashboard" id={id} />
        </SidebarContent>
      ) : (
        <SidebarContent className="border-l bg-[var(--sidebar-foreground)] text-[var(--sidebar)] flex-1 min-h-0 overflow-auto">
          <SidebarHeader className="gap-3.5 border-b p-4">
            <span className="text-foreground text-base font-medium">
              Dashboards
            </span>
          </SidebarHeader>
          <SidebarGroup>
            <SidebarGroupContent>
              {panels.map((item) => (
                <a
                  href="#"
                  key={item.id}
                  className="hover:bg-(--sidebar-accent) hover:text-(--sidebar-accent-foreground) flex flex-col gap-2 border-b p-4 text-sm leading-tight last:border-b-0"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{item.label}</span>
                    {item.href && <span className="ml-auto text-xs">{item.href}</span>}
                  </div>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      )}
    </Sidebar>
  );
}
