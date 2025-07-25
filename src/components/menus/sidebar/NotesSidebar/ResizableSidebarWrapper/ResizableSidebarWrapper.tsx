"use client";

import { cn } from "@/utils";
import { SidebarInset, useSidebar } from "@/components/atoms/ui/sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/atoms/ui/resizable";
import { useEffect, useRef } from "react";
import type { ImperativePanelHandle } from "react-resizable-panels";
import type { SidebarScope } from "@/stores/sidebarStore";
import { useUIStore } from "@/stores";

interface ResizableSidebarWrapperProps {
  id: string;
  scope: SidebarScope;
  children: React.ReactNode;
  sidebar: React.ReactNode;
}
export function ResizableSidebarWrapper({ id, scope, children, sidebar }: ResizableSidebarWrapperProps) {
  const panelRef = useRef<ImperativePanelHandle>(null);
  const { open, setOpen } = useSidebar()
  const notesSidebar = useUIStore(state => state.components.notesSidebar)
  const setComponent = useUIStore(state => state.setComponent)
  const isNotesVisible = notesSidebar ? notesSidebar.isVisible : false

  useEffect(() => {
    if (!notesSidebar) {
      setComponent("notesSidebar", { isVisible: false, isExpanded: false })
    }
  }, [notesSidebar, setComponent])

  const isVisible = scope === "note" && isNotesVisible

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (open && panel.isCollapsed()) {
      panel.expand();
    } else if (!open && panel.isExpanded()) {
      panel.collapse();
    }
  }, [open]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (!isVisible && !open && panel.isCollapsed()) return;

    if (isVisible && panel.isCollapsed()) {
      panel.expand()
      setOpen(true)
    }

    if (!isVisible && panel.isExpanded()) {
      panel.collapse()
      setOpen(false)
    }
  }, [isVisible, open, setOpen])

  return (
    <ResizablePanelGroup direction="horizontal" className="bg-[var(--background)] text-[var(--foreground)] flex-1 overflow-hidden flex">
      <ResizablePanel className={cn("flex-1 min-w-0 overflow-hidden transition-all duration-300 flex flex-col", {
        "shrink-0": open,
        "mx-auto w-full": !open
      })}>
        <SidebarInset>
          <div
            data-id={`${scope}-${id}`}
            className={cn("flex flex-col flex-1 bg-[var(--background)] text-[var(--foreground)]")}
          >
            {children}
          </div>
        </SidebarInset>
      </ResizablePanel >
      {open && <ResizableHandle withHandle />}
      <ResizablePanel
        ref={panelRef}
        defaultSize={30}
        minSize={10}
        collapsible
        className="border-l overflow-hidden transition-all duration-300 flex flex-col"
      >
        {sidebar}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
