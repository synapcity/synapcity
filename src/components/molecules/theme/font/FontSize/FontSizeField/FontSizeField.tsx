"use client"

import { Controller, useFormContext } from "react-hook-form"
import { FontSizeControls } from "../FontSizeControls"
import { Label } from "@/components"
import { useTheme } from "@/providers/ThemeProvider"
import type { FontSizeToken } from "@/theme/font/types"

export const FontSizeField = () => {
  const { control } = useFormContext()
  const { updateFontSize } = useTheme()
  const handleChange = (value: FontSizeToken) => {
    updateFontSize(value, true)
  }
  return (
    <div className="space-y-2">
      <Label>Font Size</Label>
      <Controller
        control={control}
        name="fontSize"
        render={({ field }) => (
          <FontSizeControls value={field.value} onChange={(value: FontSizeToken) => {
            handleChange(value)
            field.onChange(value)
          }} />
        )}
      />
    </div>
  )
}