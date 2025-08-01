"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/utils/style-utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/ui/tooltip"
import { useSidebar } from "./SidebarProvider"

// export const sidebarMenuButtonVariants = cva(
//   "peer/menu-button flex flex-1 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-[var(--accent-background)] hover:text-[var(--accent-foreground)] focus-visible:ring-2 active:bg-[var(--accent-200)] active:text-[var(-accent-foreground)] disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-[var(--accent)] data-[active=true]:font-medium data-[active=true]:text-[var(--accent-foreground)] data-[state=open]:hover:bg-[var(--accent)] data-[state=open]:hover:text-[var(--accent-foreground)] group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 aspect-square",
//   {
//     variants: {
//       variant: {
//         default:
//           "bg-[var(--accent-background)] text-[var(--accent-foreground)] hover:bg-[var(--accent-foreground)] hover:text-[var(--accent-background)]",
//         outline:
//           "bg-[var(--background)] shadow-[0_0_0_1px_hsl(var(--sidebar-border))] text-[var(--sidebar-accent-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)] hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
//       },
//       size: {
//         default: "size-8 text-sm",
//         sm: "h-6 text-xs",
//         lg: "h-10 text-sm group-data-[collapsible=icon]:p-0!",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// );
export const sidebarMenuButtonVariants = cva(
  "peer/menu-button relative flex flex-1 items-center gap-2 overflow-hidden rounded-md p-2 text-left text-xs ring-offset-background transition-colors transition-[width,height,padding] duration-150 ease-out",
  {
    variants: {
      variant: {
        default: cn(
          // Base muted background with subtle hover
          "bg-transparent text-muted-foreground hover:bg-muted/10 hover:text-foreground",
          // Active state
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
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}