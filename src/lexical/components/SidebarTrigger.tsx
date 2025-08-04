"use client";

import * as React from "react";
import { PanelLeftIcon } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "@/components/atoms";
import { useSidebar } from "@/components/atoms/ui/sidebar";

/**
 * Optional button for toggling sidebar anywhere in your layout.
 */
export function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="Toggle Sidebar"
      data-slot="sidebar-trigger"
      data-sidebar="trigger"
      onClick={(e) => {
        toggleSidebar();
        onClick?.(e);
      }}
      className={cn(
        "h-7 w-7 p-0 flex items-center justify-center",
        "transition-colors hover:bg-muted/20 active:bg-muted/30",
        className
      )}
      {...props}
    >
      <PanelLeftIcon className="w-4 h-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
