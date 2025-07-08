"use client";
import { DarkModeField } from "@/components/molecules/theme/ThemeForm/ThemeFormFields/DarkMode";
import { SwitchField, FontSizeField } from "@/components/molecules/theme"
import { useTheme } from "@/providers";

export function GeneralTab() {
  const { isScoped } = useTheme();

  return (
    <div className="grid gap-4">
      <DarkModeField />
      <FontSizeField />
      {isScoped && <SwitchField name="useGlobalTheme" label="Use Global Theme" />}
    </div>
  );
}
