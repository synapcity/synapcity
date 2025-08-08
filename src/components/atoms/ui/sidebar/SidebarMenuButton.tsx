"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/style-utils";
import { cva } from "class-variance-authority";
import { Tooltip } from "../../Tooltip";
export const sidebarMenuButtonVariants = cva(
  "peer/menu-button relative flex flex-1 items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-offset-background transition-colors transition-[width,height,padding] duration-150 ease-out",
  {
    variants: {
      variant: {
        default: cn(
          "bg-transparent text-(--sidebar-foreground) hover:bg-muted/10 hover:text-foreground",
          "data-[active=true]:bg-accent-100 data-[active=true]:text-accent-foreground data-[active=true]:font-medium",
          "hover:bg-muted/10 active:bg-muted/20 hover:text-(--accent)",
        ),
        outline: cn(
          "border border-border text-(--sidebar-foreground)",
          "hover:bg-muted/10 hover:text-foreground",
          "data-[active=true]:border-accent data-[active=true]:text-accent-foreground"
        ),
        auto: cn(
          "items-center h-auto p-auto",
          // "data-[active=true]:bg-(--sidebar-accent) data-[active=true]:text-(--sidebar-background)"
        )
      },
      size: {
        default: "h-9 px-2 text-sm",
        sm: "h-7 px-2 text-xs",
        lg: "h-11 px-3 text-base",
        auto: "h-auto p-auto"
      },
      isActive: {
        true: "data-[active=true]:bg-(--sidebar-accent) data-[active=true]:text-(--sidebar-accent-foreground)",
        false: ""
      },
      icon: {
        sm: "[&>svg]:size-4",
        default: "[&>svg]:size-6"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      isActive: false,
      icon: "default"
    },
  }
);
export function SidebarMenuButton({
  asChild = false,
  isActive = false,
  size = "default",
  variant = "default",
  className,
  icon = "default",
  tooltip,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  size?: "default" | "sm" | "lg" | "auto";
  variant?: "default" | "outline" | "auto";
  icon?: "sm" | "default"
  tooltip?: string;
}) {
  const Comp = asChild ? Slot : "button";
  const innerValue = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-active={isActive}
      data-size={size}
      className={cn(
        "flex items-center gap-2 rounded-md text-sm transition flex-1",
        "data-[active=true]:hover:text-(--accent-foreground) active:bg-(--sidebar-accent) text-(--primary-foreground) hover:text-(--accent)",
        "group-data-[collapsible=icon]:hidden [&>svg]:size-4 text-xs",
        sidebarMenuButtonVariants({ variant, size, isActive, icon }),
        className
      )}
      {...props}
    />
  );
  if (tooltip) {
    return (
      <Tooltip
        content={tooltip}
      >
        {innerValue}
      </Tooltip>
    )
  } else {
    return innerValue
  }

}
