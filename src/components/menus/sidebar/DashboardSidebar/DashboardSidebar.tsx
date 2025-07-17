"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
} from "@/components/atoms/ui/sidebar";
import { Label } from "@/components/atoms";
import { Switch } from "@/components/molecules";
import { IconSidebar, SidebarRenderer } from "@/components/menus/sidebar/NotesSidebar";
// import { useDashboardStore } from "@/stores";
import { SidebarPanel } from "@/types/sidebar";
import { usePanels } from "@/hooks/sidebar";
import { useTabsForEntity } from "@/hooks/features/useTabsForEntity";
// import { useTabsForEntity } from "@/hooks/suseTabsForEntity";

// ---- Types ----
type AppSidebarProps = {
  id: string;
} & React.ComponentProps<typeof Sidebar>;

export function DashboardSidebar({
  id,
  ...props
}: AppSidebarProps) {
  const { open } = useSidebar();
  const { panels, activePanel } = usePanels("dashboard", id);
  const dashTabs = useTabsForEntity(
    "dashboard", id
  )
  // const dashboard = useDashboardStore(state => state.getDashboardById(id))
  // const sidebarByScope = useSidebarStore(state => state.sidebarByScope)
  // const addPanels = useSidebarStore(state => state.hydratePanels)

  // const dashTabs = useTabsForEntity("dashboard", id)
  const SIDEBAR_WIDTH_ICON = "3.5rem";
  const SIDEBAR_WIDTH = "30rem";

  // if (!dashboard) return null;
  // const prefs = sidebarByScope.dashboard[id] ?? addPanels("dashboard", id)
  // if (!prefs) {
  //   addPanels(
  //     "dashboard", id
  //   )
  // }
  // const activePanelId = prefs.activePanel
  // const activePanel = prefs.panels.find((panel) => panel.id === activePanelId) ?? prefs.panels[0]
  // const items = prefs.panels;

  // const Component = activePanel?.component;
  return (
    <Sidebar
      collapsible="icon"
      side="right"
      variant="inset"
      className="w-full overflow-hidden *:data-[sidebar=sidebar]:flex-row bg-[var(--background)] text-[var(--foreground)]"
      style={
        {
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          "--sidebar-width": SIDEBAR_WIDTH,
        } as React.CSSProperties
      }
      {...props}
    >
      <IconSidebar
        key={id}
        scope="dashboard"
        id={id}
        onAdd={dashTabs.handleAddTab}
      />

      {(open) ? (
        <SidebarContent>
          <SidebarRenderer scope={"dashboard"} id={id} />
        </SidebarContent>
      ) : (
        <SidebarContent className="border-l">
          <SidebarHeader className="gap-3.5 border-b p-4">
            <div className="flex w-full items-center justify-between">
              <div className="text-foreground text-base font-medium">
                {activePanel?.label}
              </div>
              <Label className="flex items-center gap-2 text-sm">
                <span>Unreads</span>
                <Switch className="shadow-none" />
              </Label>
            </div>
          </SidebarHeader>

          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {panels.map((item: SidebarPanel) => (
                <a
                  href="#"
                  key={item.id}
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{item.label}</span>
                    <span className="ml-auto text-xs">{item.href}</span>
                  </div>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarFooter>Footer</SidebarFooter>
        </SidebarContent>
      )}
    </Sidebar>
  );
}
