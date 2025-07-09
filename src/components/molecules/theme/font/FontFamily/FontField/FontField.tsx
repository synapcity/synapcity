"use client"

import { Controller, useFormContext } from "react-hook-form";
import { FontFamilyCombobox } from "../FontFamilyComboBox";
import { Label } from "@/components";
import { useTheme } from "@/providers/ThemeProvider";
import { FontFamilyName } from "@/theme";

export const FontField = ({ name, label }: { name: FontFamilyName; label: string; }) => {
  const { control } = useFormContext();
  const { updateFontFamily } = useTheme();
  const handleChange = (value: string) => {
    updateFontFamily(name, value, true)
  }
  return (
    <div className="space-y-2 text-foreground¯">
      <Label>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FontFamilyCombobox
            value={field.value}
            onChange={(value: string) => {
              handleChange(value)
              field.onChange(value)
            }}
            className="text-primary-background"
          />
        )}
      />
    </div>
  )
}