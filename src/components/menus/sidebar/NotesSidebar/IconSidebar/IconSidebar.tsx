"use client";

import * as React from "react";
import { Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/atoms/ui/sidebar";
import { Icon, IconButton } from "@/components/atoms";
import { useSidebar } from "@/components/atoms/ui/sidebar";
import { SidebarScope } from "@/stores/sidebarStore";
import { usePanels } from "@/hooks";
import { useMemo } from "react";

interface IconSidebarProps {
  scope: SidebarScope;
  id: string;
  side?: "left" | "right";
}

export function IconSidebar({ scope, id, side = "right" }: IconSidebarProps) {
  const { sidebarState, toggleSidebar } = useSidebar();

  const isExpanded = sidebarState === "expanded";
  const { panels: panelsObj, activeId, setActive } = usePanels(scope, id)
  const panels = useMemo(() => Object.values(panelsObj), [panelsObj])
  const toggleSidebarIcon = (
    <IconButton
      variant="ghost"
      size="sm"
      icon={isExpanded ? "chevronRight" : "chevronLeft"}
      onClick={toggleSidebar}
      aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
    />
  )
  return (
    <Sidebar
      side={side}
      collapsible="none"
      variant="inset"
      className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r flex flex-1 bg-(--sidebar)"
    >
      <SidebarMenu className="flex-1 overflow-y-auto">
        {panels.map((panel) => {
          return (
            <SidebarMenuItem key={panel.id} className="py-2 px-1">
              <SidebarMenuButton
                variant="auto"
                size="auto"
                onClick={() => {
                  if (panel.id !== activeId) {
                    setActive(panel.id)
                  } else {
                    if (isExpanded) {
                      setActive(null)
                      toggleSidebar()
                    }
                  }
                  if (!isExpanded) {
                    toggleSidebar();
                  }
                }}
                isActive={panel.id === activeId && isExpanded}
                asChild={panel.id === activeId}
                icon="sm"
              >
                {panel.id === activeId && isExpanded ? toggleSidebarIcon : <Icon name={panel.icon ?? "boxes"} />}
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </Sidebar>
  );
}
