// components/atoms/ui-switch.tsx
"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/utils"

const UISwitch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    data-slot="switch"
    className={cn(
      "peer data-[state=checked]:bg-[var(--primary-background)] data-[state=checked]:text-[var(--primary-foreground)] data-[state=unchecked]:bg-[var(--accent)] focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
))

const UISwitchThumb = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Thumb>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Thumb
    ref={ref}
    data-slot="switch-thumb"
    className={cn(
      "bg-[var(--primary-background)] dark:data-[state=unchecked]:bg-[var(--primary)] dark:data-[state=checked]:bg-[var(--primary-foreground)] pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
      className
    )}
    {...props}
  />
))

UISwitch.displayName = "UISwitch"
UISwitchThumb.displayName = "UISwitchThumb"

export { UISwitch, UISwitchThumb }
