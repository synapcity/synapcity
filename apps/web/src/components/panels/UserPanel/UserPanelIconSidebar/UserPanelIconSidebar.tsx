"use client";

import { Sidebar } from "@/components/atoms/ui/sidebar";
import { IconSidebarContent } from "@/components/menus/sidebar/UserPanelSidebar/SidebarWrapper/IconSidebarContent";

export const UserPanelIconSidebar = () => {
  return (
    <Sidebar
      side="left"
      collapsible="none"
      variant="icon"
      className="w-[calc(var(--sidebar-width-icon)+1px)]! flex bg-(--sidebar) flex flex-col items-center gap-4 py-4"
      style={{
        width: "48px",
        maxWidth: "48px",
      }}
    >
      <IconSidebarContent />
    </Sidebar>
  );
};
