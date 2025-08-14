"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

export const toggleVariants = cva(
  [
    "inline-flex select-none items-center justify-center gap-2",
    "rounded-md text-sm font-medium",
    "transition-[background-color,color,box-shadow,transform] duration-150",
    "outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-(--background)",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    "active:translate-y-[0.5px]",
    "aria-invalid:ring-(--destructive)/30 aria-invalid:border-(--destructive)",
  ].join(" "),
  {
    variants: {
      variant: {
        soft: [
          "bg-(--muted) text-(--foreground) hover:bg-(--muted)/80",
          "data-[state=on]:bg-(--accent) data-[state=on]:text-(--accent-foreground)",
          "data-[state=on]:shadow-sm",
        ].join(" "),
        outline: [
          "border border-(--border) bg-(--transparent) text-(--foreground) hover:bg-(--muted)/60",
          "data-[state=on]:border-(--accent) data-[state=on]:bg-[color:var(--accent-muted,transparent)]",
          "data-[state=on]:text-(--accent-foreground)",
        ].join(" "),
        ghost: [
          "bg-(--transparent) text-(--foreground) hover:bg-(--muted)/60",
          "data-[state=on]:text-(--accent-foreground)] data-[state=on]:bg-(--accent)",
        ].join(" "),
        solid: [
          "bg-[color:var(--panel,theme(colors.muted.DEFAULT))] text-(--foreground) hover:bg-[color:var(--panel,theme(colors.muted/80))]",
          "data-[state=on]:bg-(--accent) data-[state=on]:text-(--accent-foreground)",
        ].join(" "),
      },
      tone: {
        neutral: "",
        accent: "data-[state=on]:bg-(--accent) data-[state=on]:text-(--accent-foreground)",
        primary: "data-[state=on]:bg-(--primary) data-[state=on]:text-(--primary-foreground)",
        destructive:
          "data-[state=on]:bg-(--destructive) data-[state=on]:text-(--destructive-foreground)",
      },
      shape: {
        md: "rounded-md",
        pill: "rounded-full",
      },
      size: {
        sm: "h-7 min-w-7 px-2 text-[13px]",
        md: "h-8 min-w-8 px-2.5",
        lg: "h-9 min-w-9 px-3 text-[15px]",
        default: "h-6 min-w-6 text-[12px]",
      },
      elevated: {
        true: "data-[state=on]:shadow-[0_1px_0_0_rgba(0,0,0,0.04),0_2px_6px_-1px_rgba(0,0,0,0.08)]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "soft",
      tone: "neutral",
      shape: "md",
      size: "md",
      elevated: true,
    },
  }
);

export type ToggleProps = React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>;

export function Toggle({ className, variant, tone, shape, size, elevated, ...props }: ToggleProps) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, tone, shape, size, elevated }), className)}
      {...props}
    />
  );
}

// "use client";

// import * as React from "react";
// import * as TogglePrimitive from "@radix-ui/react-toggle";
// import { cva, type VariantProps } from "class-variance-authority";
// import { cn } from "@/utils";

// export const toggleVariants = cva(
//   [
//     // base
//     "inline-flex select-none items-center justify-center gap-2",
//     "rounded-md text-sm font-medium",
//     "transition-[background-color,color,box-shadow,transform] duration-150",
//     "outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
//     "disabled:pointer-events-none disabled:opacity-50",
//     // svg sizing
//     "[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
//     // pressed micro-interaction
//     "active:translate-y-[0.5px]",
//     // invalid state
//     "aria-invalid:ring-destructive/30 aria-invalid:border-destructive",
//   ].join(" "),
//   {
//     variants: {
//       variant: {
//         // solid chip
//         solid: [
//           "bg-muted text-foreground/80 hover:bg-muted/80",
//           "data-[state=on]:bg-[var(--accent)] data-[state=on]:text-[var(--accent-foreground)]",
//           "data-[state=on]:shadow-sm",
//         ].join(" "),
//         // outline chip
//         outline: [
//           "border border-border bg-transparent text-foreground/80 hover:bg-muted/60",
//           "data-[state=on]:border-[var(--accent)] data-[state=on]:bg-[color:var(--accent-muted,transparent)]",
//           "data-[state=on]:text-[var(--accent-foreground)]",
//           "data-[state=on]:shadow-sm",
//         ].join(" "),
//         // quiet/ghost
//         ghost: [
//           "bg-transparent text-muted-foreground hover:bg-muted/60",
//           "data-[state=on]:text-[var(--accent)]",
//         ].join(" "),
//         // very soft background even when off
//         soft: [
//           "bg-muted/60 text-foreground/80 hover:bg-muted",
//           "data-[state=on]:bg-[var(--accent-muted,theme(colors.accent/20))]",
//           "data-[state=on]:text-[var(--accent-foreground)]",
//           "data-[state=on]:shadow-sm",
//         ].join(" "),
//       },
//       tone: {
//         neutral: "", // uses default vars above
//         accent:
//           "data-[state=on]:bg-[var(--accent)] data-[state=on]:text-[var(--accent-foreground)]",
//         primary:
//           "data-[state=on]:bg-[var(--primary)] data-[state=on]:text-[var(--primary-foreground)]",
//         destructive: "data-[state=on]:bg-destructive data-[state=on]:text-destructive-foreground",
//       },
//       shape: {
//         md: "rounded-md",
//         pill: "rounded-full",
//       },
//       size: {
//         sm: "h-7 min-w-7 px-2 text-[13px]",
//         md: "h-8 min-w-8 px-2.5",
//         lg: "h-9 min-w-9 px-3 text-[15px]",
//       },
//       elevated: {
//         true: "data-[state=on]:shadow-[0_1px_0_0_rgba(0,0,0,0.04),0_2px_6px_-1px_rgba(0,0,0,0.08)]",
//         false: "",
//       },
//     },
//     defaultVariants: {
//       variant: "soft",
//       tone: "neutral",
//       shape: "md",
//       size: "md",
//       elevated: true,
//     },
//   }
// );

// type ToggleProps = React.ComponentProps<typeof TogglePrimitive.Root> &
//   VariantProps<typeof toggleVariants>;
