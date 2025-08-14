"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/utils";
import { useSidebar } from "@/components/atoms/ui/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/atoms/ui/resizable";
import type { ImperativePanelHandle } from "react-resizable-panels";
import { PanelRightClose } from "lucide-react";
import { IconSidebar } from "../IconSidebar";
import { SidebarScope } from "@/stores/ui/sidebarStore";
import { usePanels } from "@/hooks";
import { BreadcrumbHeader } from "@/components/molecules/Breadcrumbs";

interface ResizableSidebarWrapperProps {
  id: string;
  scope: string;
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export function ResizableSidebarWrapper({
  id,
  scope,
  children,
  sidebar,
}: ResizableSidebarWrapperProps) {
  const panelRef = useRef<ImperativePanelHandle>(null);
  const { sidebarState, toggleSidebar } = useSidebar();
  const { activePanel } = usePanels(scope as SidebarScope, id);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (sidebarState === "expanded" && panel.isCollapsed()) {
      panel.expand();
    } else if (sidebarState !== "expanded" && panel.isExpanded()) {
      panel.collapse();
    }
  }, [sidebarState]);

  return (
    <div className="outer-container flex flex-1 h-full min-h-0 overflow-hidden">
      <ResizablePanelGroup
        id="resizable-panel-group"
        direction="horizontal"
        className="flex-1 h-full min-h-0"
      >
        <ResizablePanel
          id="main"
          order={1}
          className="
            min-w-0 flex-1 h-full min-h-0
            bg-[var(--background)]
            p-4
            flex flex-col
            overflow-hidden
          "
        >
          <div className="shrink-0">
            <BreadcrumbHeader />
          </div>

          {/* Main content area can scroll independently if it needs to */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">{children}</div>
        </ResizablePanel>

        <ResizableHandle
          withHandle
          className={cn("cursor-col-resize", { "sr-only": sidebarState !== "expanded" })}
        />

        <ResizablePanel
          id="sidebar"
          ref={panelRef}
          collapsible
          collapsedSize={0}
          defaultSize={35}
          order={2}
          className={cn(
            `
            relative
            bg-(--primary-background) text-(--primary-foreground)
            flex h-full min-h-0 flex-col
            overflow-hidden
          `,
            { "flex-1": sidebarState === "expanded" }
          )}
        >
          {/* Fixed header (non-scrolling) */}
          <div className="shrink-0 flex items-center justify-between px-3 py-2 border-b bg-(--accent-background) text-(--accent-foreground)">
            <h2 className="text-sm font-medium text-(--accent-foreground)">{activePanel?.label}</h2>
            <button onClick={toggleSidebar} className="p-1 rounded hover:bg-gray-600/30">
              <PanelRightClose size={16} />
            </button>
          </div>

          {/* Scrollable sidebar content */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 m-2 flex no-scrollbar">
            {sidebar}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Icon rail */}
      <div className="flex-shrink-0 w-12 bg-[var(--sidebar-background)] text-(--sidebar-foreground) border-l flex">
        <IconSidebar key={id} scope={scope as SidebarScope} id={id} side="right" />
      </div>
    </div>
  );
}
