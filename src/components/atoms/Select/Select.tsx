"use client";

import * as React from "react";
import {
  UISelect,
  UISelectContent,
  UISelectGroup,
  UISelectItem,
  UISelectLabel,
  UISelectScrollDownButton,
  UISelectScrollUpButton,
  UISelectSeparator,
  UISelectTrigger,
  UISelectValue,
} from "@/components/atoms";
import { cn } from "@/utils";
export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type GroupedSelectOption = {
  label?: string;
  options: SelectOption[];
};

interface SelectProps {
  label?: string;
  description?: string;
  error?: string;
  options?: SelectOption[];
  groupedOptions?: GroupedSelectOption[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  size?: "default" | "sm";
  className?: string;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      description,
      error,
      options,
      placeholder = "Select an option",
      value,
      defaultValue,
      onValueChange,
      disabled,
      name,
      size = "default",
      className,
      groupedOptions,
    },
    ref
  ) => {
    const selectId = React.useId();
    const describedBy = error ? `${selectId}-error` : `${selectId}-desc`;

    const isGrouped = Array.isArray(options) && "options" in options[0];

    return (
      <div className="bg-(--background) text-(--foreground)">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-(--foreground)">
            {label}
          </label>
        )}
        <UISelect
          name={name}
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <UISelectTrigger
            ref={ref}
            id={selectId}
            size={size}
            aria-describedby={describedBy}
            aria-invalid={!!error}
            className={cn(error && "border-destructive ring-destructive/40", className)}
          >
            <UISelectValue placeholder={placeholder} />
          </UISelectTrigger>

          <UISelectContent className="bg-(--background) text-(--foreground)">
            <UISelectScrollUpButton />
            {(groupedOptions && groupedOptions.length > 0) || isGrouped
              ? groupedOptions?.map((group, index) => (
                  // <React.Fragment key={group.label ?? index}>
                  <UISelectGroup
                    key={group.label ?? index}
                    className="bg-(--background) text-(--foreground)"
                  >
                    {group.label && <UISelectLabel>{group.label}</UISelectLabel>}
                    {group.options.map((opt) => (
                      <UISelectItem
                        key={opt.value}
                        value={opt.value}
                        disabled={opt.disabled}
                        aria-disabled={opt.disabled}
                        className="hover:cursor-pointer hover:bg-(--primary-background) hover:text-(--foreground)"
                      >
                        {opt.label}
                      </UISelectItem>
                    ))}
                    {index < groupedOptions.length - 1 && (
                      <UISelectSeparator data-testid="select-separator" />
                    )}
                  </UISelectGroup>
                  // </React.Fragment>
                ))
              : options?.map((opt) => (
                  <UISelectItem
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    aria-disabled={opt.disabled}
                    className="bg-(--background) text-(--foreground) hover:cursor-pointer hover:bg-(--primary-background) hover:text-(--foreground)"
                  >
                    {opt.label}
                  </UISelectItem>
                ))}

            <UISelectScrollDownButton />
          </UISelectContent>
        </UISelect>

        {description && !error && (
          <p id={`${selectId}-desc`} className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
        {error && (
          <p id={`${selectId}-error`} role="alert" className="text-xs text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
