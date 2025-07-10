"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/atoms/ui/sidebar";
import { ExtendedSidebarItem } from "./ExtendedSidebarItem";
import { PanelModule } from "@/types/panels";
import { SortableContainer } from "@/components/sortable";

interface IconSidebarContentProps {
  items: PanelModule[];
  activeItem: PanelModule | null;
  setActiveItem: (activeItem: PanelModule) => void;
  setCustomOrder: (ids: string[]) => void;
}

export const IconSidebarContent = ({
  items,
  activeItem,
  setActiveItem,
  setCustomOrder,
}: IconSidebarContentProps) => {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent className="px-1.5 md:px-0 overflow-y-auto overflow-x-hidden no-scrollbar max-h-full">
          <SidebarMenu>
            <SortableContainer
              items={items}
              onReorder={(sorted) => setCustomOrder(sorted.map((i) => i.id))}
              renderItem={(item, { getSortableProps, isDragging }) => (
                <ExtendedSidebarItem
                  {...getSortableProps()}
                  item={item}
                  isActive={activeItem?.id === item.id}
                  setActiveItem={setActiveItem}
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
