"use client"

import { ThemePreferencesFormValues } from "@/components/molecules/theme/schema";
import { generateSemanticColor, ThemePreferences } from "@/theme";
import { useFormContext, useWatch } from "react-hook-form";

export function useLivePreviewTheme(): ThemePreferences {
  const { control } = useFormContext<ThemePreferencesFormValues>();
  const values = useWatch({ control })
  const finalFormObject = {
    ...values,
    primary: generateSemanticColor(values.primary!),
    accent: generateSemanticColor(values.accent!)
  }
  return { ...finalFormObject } as ThemePreferences
}
