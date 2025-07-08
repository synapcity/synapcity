"use client";

import { cn } from "@/utils";
import { RefObject, useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ThemePreferencesFormValues } from "../schema";
import { Button } from "@/components/atoms";
import { useTheme } from "@/providers/ThemeProvider";
import { isEqual } from "lodash";
import { applyThemeVars, ThemePreferences } from "@/theme";

export function ThemePreview() {
  const { control } = useFormContext<ThemePreferencesFormValues>();
  const liveValues = useWatch({ control }) as ThemePreferences;
  const { previewRef, previewTheme, updatePreviewTheme } = useTheme();
  const prevValuesRef = useRef<ThemePreferencesFormValues | null>(null);

  useEffect(() => {
    if (!isEqual(prevValuesRef.current, liveValues)) {
      updatePreviewTheme(liveValues);
      prevValuesRef.current = liveValues;
    }

    if (previewRef.current) {
      applyThemeVars({
        preferences: liveValues,
        element: previewRef.current,
      });
    }
  }, [liveValues, previewRef, previewTheme, updatePreviewTheme]);

  return (
    <div
      ref={previewRef as RefObject<HTMLDivElement>}
      className={cn(
        "rounded-md border p-4 shadow-sm transition-all",
        "text-[var(--foreground)] bg-[var(--background)]", liveValues.mode)}
      data-theme={liveValues.mode}
    >
      <div className="space-y-2">
        <h3 className="text-xl font-heading">Heading Preview</h3>
        <p className="text-base font-body leading-relaxed">
          This is a preview of your current theme settings including font, color, and mode.
        </p>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" className="flex-1">Primary</Button>
          <Button className="flex-1">Accent</Button>
        </div>
      </div>
    </div>
  );
}
