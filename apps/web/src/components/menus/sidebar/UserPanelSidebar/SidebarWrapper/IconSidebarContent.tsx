"use client";

import { SidebarContent, SidebarMenu, useSidebar } from "@/components/atoms/ui/sidebar";
import { ExtendedSidebarItem } from "./ExtendedSidebarItem";
import { SortableContainer } from "@/components/sortable";
import { useUserPanel } from "@/hooks/features/useUserPanel/useUserPanel";
import type { PanelModule } from "@/types/panels";
import { IconButton } from "@/components/atoms";
import { useUIStore } from "@/stores";

export const IconSidebarContent = () => {
  const { setCustomOrder, activeModuleId, modules } = useUserPanel();
  const { toggleSidebar } = useSidebar();
  const toggleComp = useUIStore((s) => s.toggleCompState);

  const toggle = () => {
    toggleSidebar();
    toggleComp("userPanelSidebar", "isExpanded");
  };
  return (
    <SidebarContent className="flex-1">
      <IconButton icon="command" size="sm" onClick={() => toggle()} />
      <SidebarMenu className="overflow-y-auto min-h-0 no-scrollbar">
        <SortableContainer
          items={modules as PanelModule[]}
          onReorder={(sorted) => setCustomOrder(sorted.map((i) => i.id))}
          renderItem={(module, { getSortableProps, isDragging }) => (
            <ExtendedSidebarItem
              {...getSortableProps()}
              module={module}
              isActive={activeModuleId === module.id}
              isDragging={isDragging}
            />
          )}
        />
      </SidebarMenu>
    </SidebarContent>
  );
};
