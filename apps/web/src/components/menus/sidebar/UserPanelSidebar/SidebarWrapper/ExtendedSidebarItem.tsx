"use client";

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

export const ExtendedSidebarItem = ({
  module,
  isActive,
  isDragging,
  ...sortableProps
}: ExtendedSidebarItemProps) => {
  const { setActiveModuleId } = useUserPanel();
  const { setOpen } = useSidebar();
  return (
    <SidebarMenuItem
      {...sortableProps}
      style={{
        width: "48px",
        maxWidth: "48px",
      }}
    >
      <SidebarMenuButton
        variant="auto"
        size="sm"
        isActive={isActive}
        className={cn(
          "group flex items-center justify-center size-9 rounded-md transition-colors",
          isActive && "active:text-[var(--accent)] data-[active=true]:bg-transparent"
        )}
        asChild
        style={{
          width: "48px",
          maxWidth: "48px",
        }}
        tooltip={module.label}
        tooltipPosition="right"
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
  );
};
