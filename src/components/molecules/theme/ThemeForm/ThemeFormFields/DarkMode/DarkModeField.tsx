"use client"

import { Controller, useFormContext } from "react-hook-form";
import { DarkModeRadioGroup } from "./DarkModeRadioGroup";
import { ThemeMode } from "@/theme";

export const DarkModeField = () => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name="mode"
      render={({ field }) => {
        return (
          <DarkModeRadioGroup value={field.value} onChange={(value: ThemeMode) => {
            field.onChange(value)
          }} />
        )
      }}
    />
  )
}
