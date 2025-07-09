"use client";

import { cn, getUpdatedValues } from "@/utils";
import { RefObject, useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ThemePreferencesFormValues } from "../schema";
import { Button } from "@/components/atoms";
import { applyThemeVars } from "@/theme";
import { useTheme } from "@/providers";
import { useLivePreviewTheme } from "@/hooks/useLivePreviewTheme";

export function ThemePreview() {
  const { control } = useFormContext<ThemePreferencesFormValues>();
  const liveValues = useWatch({ control }) as ThemePreferencesFormValues;
  const previewRef = useRef<HTMLDivElement | null>(null)
  const { prefs } = useTheme()
  const finalFormObject = useLivePreviewTheme()


  useEffect(() => {
    if (previewRef.current) {
      console.log("[ThemePreview] first-finalFormObject", finalFormObject, "preview", previewRef.current)
      applyThemeVars({
        preferences: finalFormObject,
        element: previewRef.current as HTMLElement,
        modeOverride: liveValues.mode
      });
    }
  }, [finalFormObject, previewRef, liveValues.mode]);

  useEffect(() => {
    console.log("[ThemePreview] second-finalFormObject", finalFormObject, "preview", previewRef.current)
    const diffValues = getUpdatedValues(prefs, finalFormObject)
    console.log("ThemePreview] second - diffValues", diffValues, "prefs", prefs, "finalForm", finalFormObject)
    if (Object.values(diffValues).length > 0) {
      console.log("[ThemePreview] inside", diffValues, "preview", previewRef.current)
      applyThemeVars({
        preferences: diffValues,
        element: previewRef.current as HTMLElement,
        modeOverride: liveValues.mode
      })
    }
  }, [prefs, finalFormObject, liveValues.mode])


  return (
    <div
      ref={previewRef as RefObject<HTMLDivElement>}
      className={cn(
        "rounded-md border p-4 shadow-sm transition-all",
        "text-[var(--foreground)] bg-[var(--background)] ", liveValues.mode)}
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
