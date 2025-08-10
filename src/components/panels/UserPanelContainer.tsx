"use client";

import { useUIStore } from "@/stores";
import { SidebarProvider } from "../atoms/ui/sidebar";
import { useShallow } from "zustand/shallow";
import { InboxTrigger } from "../atoms";

export const UserContainer = ({ children }: { children: React.ReactNode }) => {
  const isOpen = useUIStore(
    useShallow((s) => s.components?.["userPanelSidebar"]?.["isExpanded"] ?? false)
  );
  return (
    <SidebarProvider
      sidebarId="user-panel-sidebar"
      style={{ "--sidebar-width-icon": "48px" } as React.CSSProperties}
      open={isOpen}
      collapsible="icon"
      className="relative"
    >
      {children}
      <InboxTrigger className="absolute bottom-4 right-4 opacity-50 hover:opacity-100 transition-opacity duration-200 ease-linear" />
    </SidebarProvider>
  );
};
