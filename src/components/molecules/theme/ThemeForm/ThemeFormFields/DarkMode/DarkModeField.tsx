"use client"

import { Controller, useFormContext } from "react-hook-form";
import { DarkModeRadioGroup } from "./DarkModeRadioGroup";
import { useTheme } from "@/providers";
import { ThemeMode } from "@/theme";

export const DarkModeField = () => {
  const { control } = useFormContext()
  const { updateMode } = useTheme()
  const handleChange = (value: ThemeMode) => {
    updateMode(value, true)
  }
  return (
    <Controller
      control={control}
      name="mode"
      render={({ field }) => {
        return (
          <DarkModeRadioGroup value={field.value} onChange={(value: ThemeMode) => {
            handleChange(value)
            field.onChange(value)
          }} />
        )
      }}
    />
  )
}
