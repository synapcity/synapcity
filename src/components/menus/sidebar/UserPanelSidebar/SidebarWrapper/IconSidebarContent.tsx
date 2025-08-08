"use client";

import {
  SidebarContent,
  SidebarMenu,
} from "@/components/atoms/ui/sidebar";
import { ExtendedSidebarItem } from "./ExtendedSidebarItem";
import { SortableContainer } from "@/components/sortable";
import { useUserPanel } from "@/hooks/features/useUserPanel/useUserPanel";
import type { PanelModule } from "@/types/panels";

export const IconSidebarContent = () => {
  const { setCustomOrder, activeModuleId, modules } = useUserPanel()
  return (
    <SidebarContent className="flex-1 overflow-y-auto min-h-0 no-scrollbar">
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
    </SidebarContent>
  );
};
