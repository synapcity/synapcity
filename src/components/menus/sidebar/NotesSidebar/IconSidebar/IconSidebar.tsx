"use client";

import * as React from "react";
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/atoms/ui/sidebar";
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
  const { panels: panelsObj } = usePanels(scope, id)
  const panels = useMemo(() => Object.values(panelsObj), [panelsObj])

  return (
    <Sidebar
      side={side}
      collapsible="none"
      variant="inset"
      className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r h-full shrink-0 flex flex-col"
    >
      <SidebarHeader className="flex items-start justify-center gap-2 p-1">
        {/* Chevron always visible */}
        <IconButton
          variant="ghost"
          size="sm"
          icon={isExpanded ? "chevronRight" : "chevronLeft"}
          onClick={toggleSidebar}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        />
      </SidebarHeader>

      <SidebarMenu className="flex-1 overflow-y-auto">
        {/* your existing menu items */}
        {panels.map((panel) => {
          return (
            <SidebarMenuItem key={panel.id}>
              <SidebarMenuButton
                onClick={() => {
                  /* handle panel selection… */
                  toggleSidebar();
                }}
              >
                <Icon name={panel.icon} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </Sidebar>
  );
}
