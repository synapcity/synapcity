"use client"

import { Controller, useFormContext } from "react-hook-form"
import { FontSizeControls } from "../FontSizeControls"
import { Label } from "@/components"
import type { FontSizeToken } from "@/theme/types"

export const FontSizeField = () => {
  const { control } = useFormContext()
  return (
    <div className="space-y-2">
      <Label>Font Size</Label>
      <Controller
        control={control}
        name="fontSize"
        render={({ field }) => (
          <FontSizeControls value={field.value} onChange={(value: FontSizeToken) => {
            field.onChange(value)
          }} />
        )}
      />
    </div>
  )
}