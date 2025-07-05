"use client"

import { Controller, useFormContext } from "react-hook-form";
import { DarkModeRadioGroup } from "./DarkModeRadioGroup";

export const DarkModeField = () => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name="mode"
      render={({ field }) => (
        <DarkModeRadioGroup value={field.value} onChange={field.onChange} />
      )}
    />
  )
}
