"use client"

import * as React from "react"

import { cn } from "@/utils/index"
import { Separator } from "@/components/atoms/ui/separator"

export function SidebarSeparator({
  className,
  direction = "horizontal",
  ...props
}: React.ComponentProps<typeof Separator> & { direction: "horizontal" | "vertical" }) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      data-orientation={direction}
      className={cn("bg-sidebar-border", { "mx-2 w-auto": direction === "horizontal", "h-auto": direction === "vertical" }, className)}
      {...props}
    />
  )
}