"use client"

import { IconButton } from "@/components/atoms";
import { SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/atoms/ui/sidebar";
import { useUserPanel } from "@/hooks/useUserPanel/useUserPanel";
import { PanelModule } from "@/types/panels";
import { cn } from "@/utils";

interface ExtendedSidebarItemProps {
  module: PanelModule;
  isDragging: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const ExtendedSidebarItem = ({ module, isActive, isDragging, ...sortableProps }: ExtendedSidebarItemProps) => {
  const { setActiveModuleId } = useUserPanel()
  const { setOpen } = useSidebar()
  return (
    <SidebarMenuItem {...sortableProps}>
      <SidebarMenuButton
        tooltip={{
          children: module.label,
          hidden: false,
        }}
        isActive={isActive}
        className="bg-[var(--accent-background)] hover:bg-[var(--accent-foreground)] active:bg-[var(--accent-background)] text-[var(--accent-foreground)] hover:text-[var(--accent-background)] active:text-[var(--accent-foreground)]"
        asChild
      >

        <IconButton
          icon={module.icon}
          variant="ghost"
          className={cn({
            "opacity-40 pointer-events-none": isDragging,
          })}
          onClick={() => {
            setActiveModuleId(module.id);
            setOpen(true);
          }}
        />
      </SidebarMenuButton>

    </SidebarMenuItem>
  )
}