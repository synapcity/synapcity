"use client";

import { Label } from "@/components";
import { Switch } from "@/components/molecules";
import { Controller, useFormContext } from "react-hook-form";

interface SwitchFieldProps {
  label: string;
  name: string;
}

export const SwitchField = ({
  label,
  name
}: SwitchFieldProps) => {
  const { control } = useFormContext()
  return (
    <div className="flex items-center gap-2">
      <Label>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
      />
    </div>
  )
}