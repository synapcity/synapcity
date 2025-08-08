"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/atoms/ui/sidebar";
import { ContextSelector } from "@/components/menus/sidebar/UserPanelSidebar/SidebarWrapper/ContextSelector";
import { ModalRenderer } from "@/components/modals";
import { useUserPanel } from "@/hooks/features/useUserPanel/useUserPanel";
import { useUIStore } from "@/stores";
import { PanelModule } from "@/types/panels";
import { useShallow } from "zustand/shallow";

export const UserPanelSidebar = () => {
  const { activeModule, modules, setActiveModuleId } = useUserPanel()
  const isOpen = useUIStore(useShallow(s => s.components?.['userPanelSidebar']?.['isExpanded']))
  return isOpen && (
    <Sidebar auto variant="container" className="hidden flex-1 md:flex flex-col relative min-h-0"
      style={{
        maxWidth: "320px"
      }}
    >
      <SidebarHeader className="gap-3.5 p-2">
        <div className="flex item-center gap-2 justify-center h-full w-full">
          <ContextSelector
            items={modules as PanelModule[]}
            activeItem={activeModule}
            setActiveItemId={setActiveModuleId}
          />
        </div>
      </SidebarHeader>
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
