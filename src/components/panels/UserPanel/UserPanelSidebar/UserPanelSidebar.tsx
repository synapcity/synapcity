"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/atoms/ui/sidebar";
import { ModalRenderer } from "@/components/modals";
import { useUserPanel } from "@/hooks/features/useUserPanel/useUserPanel";

export const UserPanelSidebar = () => {
  const { activeModule } = useUserPanel()
  return (
    <Sidebar auto variant="container" className="hidden flex-1 md:flex flex-col relative min-h-0"
      style={{
        maxWidth: "320px"
      }}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="min-h-0 overflow-y-auto no-scrollbar shadow-r">
            {activeModule?.sidebar ? (
              <activeModule.sidebar />
            ) : (
              <div className="text-muted-foreground p-4">
                No sidebar content
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
        <ModalRenderer scope="userPanelSidebar" />
      </SidebarContent>
    </Sidebar>
  );
};
