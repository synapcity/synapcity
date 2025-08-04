"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/style-utils";
import { cva } from "class-variance-authority";
export const sidebarMenuButtonVariants = cva(
  "peer/menu-button relative flex flex-1 items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-offset-background transition-colors transition-[width,height,padding] duration-150 ease-out",
  {
    variants: {
      variant: {
        default: cn(
          "bg-transparent text-muted-foreground hover:bg-muted/10 hover:text-foreground",
          "data-[active=true]:bg-accent-100 data-[active=true]:text-accent-foreground data-[active=true]:font-medium"
        ),
        outline: cn(
          "border border-border text-muted-foreground",
          "hover:bg-muted/10 hover:text-foreground",
          "data-[active=true]:border-accent data-[active=true]:text-accent-foreground"
        ),
      },
      size: {
        default: "h-9 px-2 text-sm",
        sm: "h-7 px-2 text-xs",
        lg: "h-11 px-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
export function SidebarMenuButton({
  asChild = false,
  isActive = false,
  size = "default",
  variant = "default",
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-active={isActive}
      data-size={size}
      className={cn(
        "flex items-center gap-2 px-2 py-1 rounded-md text-sm transition",
        "hover:bg-muted/10 active:bg-muted/20",
        "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground",
        "group-data-[collapsible=icon]:hidden",
        sidebarMenuButtonVariants({ variant, size }),
        className
      )}
      {...props}
    />
  );
}
