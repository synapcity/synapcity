"use client";

import * as React from "react";
import { UISwitch, UISwitchThumb } from "@/components/atoms";
import { cn } from "@/utils";

export interface SwitchProps {
  label?: string;
  description?: string;
  error?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
  id?: string;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      label,
      description,
      error,
      checked,
      defaultChecked,
      onCheckedChange,
      disabled,
      name,
      className,
      id,
    },
    ref
  ) => {
    const reactId = React.useId();
    const switchId = id ?? reactId;
    const describedBy = error ? `${switchId}-error` : `${switchId}-desc`;

    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={switchId} className="text-sm font-medium text-[var(--foreground)]">
            {label}
          </label>
        )}

        <div className="flex items-center gap-2">
          <UISwitch
            ref={ref}
            id={switchId}
            name={name}
            checked={checked}
            defaultChecked={defaultChecked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            aria-describedby={describedBy}
            aria-invalid={!!error}
            className={cn(error && "ring-destructive/40 border-destructive", className)}
          >
            <UISwitchThumb />
          </UISwitch>
        </div>

        {description && !error && (
          <p id={`${switchId}-desc`} className="text-xs text-[var(--primary-foreground)]">
            {description}
          </p>
        )}
        {error && (
          <p id={`${switchId}-error`} role="alert" className="text-xs text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";
