"use client"

import { IconButton } from "@/components/atoms";
import { SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/atoms/ui/sidebar";
import { useUserPanel } from "@/hooks/features/useUserPanel/useUserPanel";
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
        className={cn(
          "group flex items-center justify-center size-9 rounded-md text-muted-foreground hover:text-foreground transition-colors",
          // isActive && "active:bg-[var(--accent-200)] active:text-[var(--accent)]"
        )}
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
      {isActive && <span className="absolute left-1.5 h-1.5 w-1.5 bg-accent rounded-full" />}

    </SidebarMenuItem>
  )
}