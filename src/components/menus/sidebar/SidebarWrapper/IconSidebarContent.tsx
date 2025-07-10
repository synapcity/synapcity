"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/atoms/ui/sidebar";
import { ExtendedSidebarItem } from "./ExtendedSidebarItem";
import { SortableContainer } from "@/components/sortable";
import { useUserPanel } from "@/hooks/useUserPanel/useUserPanel";
import { PanelModule } from "@/types/panels";

export const IconSidebarContent = () => {
  const { setCustomOrder, activeModuleId, modules } = useUserPanel()
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent className="px-1.5 md:px-0 overflow-y-auto overflow-x-hidden no-scrollbar max-h-full">
          <SidebarMenu>
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
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};
