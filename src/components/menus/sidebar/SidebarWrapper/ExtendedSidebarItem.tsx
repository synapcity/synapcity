"use client"

import { IconButton } from "@/components/atoms";
import { SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/atoms/ui/sidebar";
import { PanelModule } from "@/types/panels";
import { cn } from "@/utils";

interface ExtendedSidebarItemProps {
  item: PanelModule;
  isActive: boolean;
  setActiveItem: (activeItem: PanelModule) => void;
  isDragging: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const ExtendedSidebarItem = ({ item, isActive, setActiveItem, isDragging, ...sortableProps }: ExtendedSidebarItemProps) => {
  const { setOpen } = useSidebar()
  return (
    <SidebarMenuItem {...sortableProps}>
      <SidebarMenuButton
        tooltip={{
          children: item.label,
          hidden: false,
        }}
        isActive={isActive}
        className="bg-black/50 hover:bg-accent dark:hover:bg-black text-white"
        asChild
      >

        <IconButton
          icon={item.icon}
          variant="ghost"
          className={cn({
            "opacity-40 pointer-events-none": isDragging,
          })}
          onClick={() => {
            setActiveItem(item);
            setOpen(true);
          }}
        />
      </SidebarMenuButton>

    </SidebarMenuItem>
  )
}