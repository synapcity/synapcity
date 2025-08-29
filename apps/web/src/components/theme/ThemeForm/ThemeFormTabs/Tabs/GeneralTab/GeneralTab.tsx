"use client";
import { DarkModeField } from "@/components/theme/ThemeForm/ThemeFormFields/DarkMode";
import { SwitchField, FontSizeField } from "@/components/theme";
import { useTheme } from "@/providers/ThemeProvider";

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
