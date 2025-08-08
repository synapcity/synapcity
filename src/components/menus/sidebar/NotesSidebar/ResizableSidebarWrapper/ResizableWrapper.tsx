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
import { SidebarScope } from "@/stores/sidebarStore";
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
  const { activePanel } = usePanels(scope as SidebarScope, id)

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
    <div className="outer-container flex flex-1 overflow-hidden">
      <ResizablePanelGroup id="resizable-panel-group" direction="horizontal" className="flex-1 flex flex-col">
        <ResizablePanel id="resizable-panel" className="min-w-0 flex-1 bg-[var(--background)] p-4 flex flex-col" order={1}>
          <BreadcrumbHeader />
          {children}
        </ResizablePanel>

        {sidebarState === "expanded" && (
          <ResizableHandle withHandle className="cursor-col-resize" />
        )}
        <ResizablePanel
          ref={panelRef}
          collapsible
          collapsedSize={0}
          defaultSize={35}
          className={cn(
            "flex flex-col overflow-auto bg-[var(--sidebar-bg)] relative bg-(--primary-background) text-(--primary-foreground)",
            { "flex-1": sidebarState === "expanded" }
          )}
          order={2}
        >
          <div className="flex items-center justify-between px-3 py-2 border-b bg-(--accent-background) text-(--accent-foreground)">
            <h2 className="text-sm font-medium text-(--accent-foreground)">{activePanel?.label}</h2>
            <button
              onClick={toggleSidebar}
              className={cn("p-1 rounded hover:bg-gray-600")}
            >
              <PanelRightClose size={16} />
            </button>
          </div>
          <div className="p-3 flex-1 flex">{sidebar}</div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <div
        className="flex-shrink-0 w-12 bg-[var(--sidebar-foreground)] text-(--sidebar-background) border-l flex"
      >
        <IconSidebar key={id} scope={scope as SidebarScope} id={id} side="right" />
      </div>
    </div>
  );
}
