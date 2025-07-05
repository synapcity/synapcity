"use client"

import * as React from "react"
import { UIRadioGroup, UIRadioGroupItem, Label } from "@/components/atoms"
import { cn } from "@/utils"

export interface RadioOption {
  label: string
  value: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  name?: string
  className?: string
  itemClassName?: string
  direction?: "vertical" | "horizontal"
}

export function RadioGroup({
  options,
  value,
  onChange,
  name,
  className,
  itemClassName,
  direction = "vertical",
}: RadioGroupProps) {
  return (
    <UIRadioGroup
      value={value}
      onValueChange={onChange}
      name={name}
      className={cn(
        direction === "horizontal" ? "flex gap-4" : "flex flex-col gap-3",
        className
      )}
    >
      {options.map(({ label, value, description, disabled }) => (
        <div key={value} className="flex items-start gap-2">
          <UIRadioGroupItem
            value={value}
            id={`radio-${value}`}
            disabled={disabled}
            className={itemClassName}
          />
          <Label
            htmlFor={`radio-${value}`}
            className={cn("text-sm leading-tight", disabled && "opacity-60")}
          >
            <div className="font-medium">{label}</div>
            {description && (
              <div className="text-muted-foreground text-xs">{description}</div>
            )}
          </Label>
        </div>
      ))}
    </UIRadioGroup>
  )
}
