"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/atoms/ui/sidebar";
import { useUserPanel } from "@/hooks/features/useUserPanel/useUserPanel";

export const UserPanelSidebar = () => {
  const { activeModule } = useUserPanel()
  return (
    <Sidebar auto collapsible="none" className="hidden flex-1 md:flex">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {activeModule?.sidebar ? (
              <activeModule.sidebar />
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
