"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/atoms/ui/sidebar";
import { Icon, IconButton } from "@/components/atoms";
import { useSidebar } from "@/components/atoms/ui/sidebar";
import { SidebarScope } from "@/stores/ui/sidebarStore";
import { useKeyboardShortcut, usePanels } from "@/hooks";
import { useMemo } from "react";
import { CommandShortcut } from "@/components/atoms/ui/command";

interface IconSidebarProps {
  scope: SidebarScope;
  id: string;
  side?: "left" | "right";
}

export function IconSidebar({ scope, id, side = "right" }: IconSidebarProps) {
  const { sidebarState, toggleSidebar } = useSidebar();

  useKeyboardShortcut({
    combos: [{ key: "s", meta: true }],
    onKeyPressed: () => toggleSidebar(),
  });

  const isExpanded = sidebarState === "expanded";
  const { panels: panelsObj, activeId, setActive } = usePanels(scope, id);
  const panels = useMemo(() => Object.values(panelsObj), [panelsObj]);
  const toggleSidebarIcon = (
    <IconButton
      variant="ghost"
      size="sm"
      icon={isExpanded ? "chevronRight" : "chevronLeft"}
      onClick={toggleSidebar}
      aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
    />
  );
  return (
    <Sidebar
      side={side}
      collapsible="none"
      variant="inset"
      className="w-[calc(var(--sidebar-width-icon)+1px)]! flex flex-1 bg-(--sidebar)"
    >
      <SidebarMenu className="flex-1 overflow-y-auto">
        <>
          <CommandShortcut side="left">⌘S</CommandShortcut>
          {panels.map((panel) => {
            return (
              <SidebarMenuItem key={panel.id} className="py-2 px-1 text-(--sidebar-foreground)">
                <SidebarMenuButton
                  variant="auto"
                  size="auto"
                  onClick={() => {
                    if (panel.id !== activeId) {
                      setActive(panel.id);
                    } else {
                      if (isExpanded) {
                        setActive(null);
                        toggleSidebar();
                      }
                    }
                    if (!isExpanded) {
                      toggleSidebar();
                    }
                  }}
                  isActive={panel.id === activeId && isExpanded}
                  asChild={panel.id === activeId}
                  icon="sm"
                  tooltip={panel.label}
                  tooltipPosition="left"
                >
                  {panel.id === activeId && isExpanded ? (
                    toggleSidebarIcon
                  ) : (
                    <Icon name={panel.icon ?? "boxes"} />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </>
      </SidebarMenu>
    </Sidebar>
  );
}
