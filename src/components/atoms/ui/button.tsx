import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/index"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary-background)] text-[var(--primary-foreground)] shadow-xs hover:bg-[var(--primary)]/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-[var(--background)] shadow-xs hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] dark:bg-[var(--input)]/30 dark:border-[var(--input)] dark:hover:bg-[var(--input)]/50",
        secondary:
          "bg-[var(--secondary)] text-[var(--secondary-foreground)] shadow-xs hover:bg-[var(--secondary)]/80",
        ghost:
          "hover:bg-[var(--accent-background)] hover:text-[var(--accent-foreground)] dark:hover:bg-[var(--accent)]/50",
        link: "text-[var(--primary-foreground)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}


function Button({
  className,
  variant,
  size,
  asChild = false,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const computedClassName = cn(buttonVariants({ variant, size, className }));

  return (
    <Comp
      {...(asChild ? { children } : { ...props, className: computedClassName, "data-slot": "button", type, children })}
    />
  );
}

export { Button, buttonVariants }
