"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/index"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-[var(--accent-background)] hover:text-[var(--accent-foreground)] disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[var(--accent-background)] data-[state-on]:text-[var(--accent-foreground)] data-[state=on]:text-[var(--accent-foreground)] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap border border-[var(--accent-background)]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-[var(--accent-400)] bg-[var(--accent-background)] text-[var(--accent-foreground)] hover:bg-[var(--accent-foreground)] hover:text-[var(--accent-background)]"
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "sm",
    },
  }
)

export type ToggleVariant = "default" | "outline";
export type ToggleSize = "default" | "sm" | "lg"

function Toggle({
  className,
  variant = "outline",
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
