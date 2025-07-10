"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/atoms/ui/sidebar";
import { USER_PANEL_MODULES } from "../../userPanelModules";
import { useUserPanelStore } from "@/stores/userPanelStore";

export const UserPanelSidebarContent = () => {
  const activeSection = useUserPanelStore((s) => s.activeSection);
  const active = USER_PANEL_MODULES.find((m) => m.id === activeSection?.id);

  return (
    <Sidebar auto collapsible="none" className="hidden flex-1 md:flex">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {active?.sidebar ? (
              <active.sidebar />
            ) : (
              <div className="text-muted-foreground p-4">
                No sidebar content
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
