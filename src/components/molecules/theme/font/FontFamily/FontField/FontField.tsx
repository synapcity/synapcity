"use client"

import { Controller, useFormContext } from "react-hook-form";
import { FontFamilyCombobox } from "../FontFamilyComboBox";
import { Label } from "@/components";

export const FontField = ({ name, label }: { name: string; label: string; }) => {
  const { control } = useFormContext();
  return (
    <div className="space-y-2 text-foreground¯">
      <Label>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FontFamilyCombobox
            value={field.value}
            onChange={field.onChange}
            className="text-primary-background"
          />
        )}
      />
    </div>
  )
}