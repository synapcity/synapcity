"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/index";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-1 aria-invalid:ring-destructive/30 aria-invalid:border-destructive disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[var(--accent)] data-[state=off]:hover:text-[var(--accent-foreground)] border border-transparent [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 data-[state=on]:text-[var(--background)]",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground hover:bg-muted/70",
        outline:
          "border border-[var(--accent)] text-[var(--foreground)] hover:bg-muted/50 data-[state=on]:bg-[var(--accent-muted)]",
        ghost:
          "bg-transparent hover:bg-muted text-muted-foreground data-[state=on]:text-[var(--primary-background)]",
      },
      size: {
        default: "h-8 px-2 min-w-8",
        sm: "h-7 px-2 text-sm min-w-7",
        lg: "h-9 px-3 text-base min-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ToggleVariant = "default" | "outline";
export type ToggleSize = "default" | "sm" | "lg";

function Toggle({
  className,
  variant = "outline",
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
