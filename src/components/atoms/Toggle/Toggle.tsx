"use client"

import * as React from "react"
import { UIToggle } from "../ui"
import { cn } from "@/utils"
import { Label } from "../Label"
import { Typography } from "../Typography"
import { Icon, IconSource } from "../Icon"

export interface ToggleProps
  extends React.ComponentProps<typeof UIToggle> {
  label?: string
  description?: string
  error?: boolean
  showIcons?: boolean
  isIconOnly?: boolean;
  icon?: string;
  source?: IconSource
}


const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      label,
      description,
      error,
      icon,
      showIcons = false,
      isIconOnly,
      className,
      children,
      pressed,
      source,
      ...props
    },
    ref
  ) => {
    const id = React.useId();

    return (
      <div className="grid gap-1.5">
        {!isIconOnly && label && (
          <Label
            htmlFor={id}
            className={cn(error && "text-destructive")}
          >
            {label}
          </Label>
        )}

        <UIToggle
          ref={ref}
          id={id}
          aria-invalid={error || undefined}
          pressed={pressed}
          className={cn(className)}
          {...props}
        >
          {showIcons ? (
            <Icon name={pressed ? "Check" : "X"} source={source} />
          ) : icon ? (
            <Icon
              name={icon}
              source={source}
              className={cn(
                "transition-colors",
                pressed ? "text-[var(--foreground)]" : ""
              )}
            />
          ) : null}

          {!isIconOnly && (
            <span
              className={cn(
                "ml-2 transition-all duration-200 ease-linear",
                isIconOnly ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
              )}
            >
              {children}
            </span>
          )}
        </UIToggle>

        {description && (
          <Typography
            variant="small"
            className={cn(error && "text-destructive")}
          >
            {description}
          </Typography>
        )}
      </div>
    );
  }
);

Toggle.displayName = "Toggle"

export { Toggle }