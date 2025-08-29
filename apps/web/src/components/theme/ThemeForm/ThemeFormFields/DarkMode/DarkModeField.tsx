"use client";

import { Controller, useFormContext } from "react-hook-form";
import { DarkModeSwitch } from "@/components/atoms/DarkModeSwitch";
import type { ThemeMode } from "@/theme/types";

export const DarkModeField = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name="mode"
      control={control}
      render={({ field }) => (
        <DarkModeSwitch
          key={field.value}
          value={field.value as ThemeMode}
          onChange={(val) => field.onChange(val)}
        />
      )}
    />
  );
};
