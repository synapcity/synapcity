"use client";

import { ThemePreferencesFormValues } from "@/components/theme/schema";
import { generateSemanticColor, ThemePreferences } from "@/theme";
import { useDeferredValue, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export function useLivePreviewTheme(): ThemePreferences {
  const { control } = useFormContext<ThemePreferencesFormValues>();
  const values = useWatch({ control });
  const deferred = useDeferredValue(values);
  const finalFormObject = useMemo(() => {
    return {
      ...deferred,
      primary: generateSemanticColor(deferred.primary!),
      accent: generateSemanticColor(deferred.accent!),
    };
  }, [deferred]);
  return { ...finalFormObject } as ThemePreferences;
}
