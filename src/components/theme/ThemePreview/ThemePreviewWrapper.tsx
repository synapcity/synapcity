"use client";

import { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { applyThemeVars } from "@/theme/applyCss/applyThemeVars";
import type { ThemePreferencesFormValues } from "../schema";
import { Button } from "@/components/atoms";
import { cn } from "@/utils";
import { ThemePreferences } from "@/theme";

export function ThemePreview() {
  const { control } = useFormContext<ThemePreferencesFormValues>();
  const liveValues = useWatch({ control });
  const previewRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (previewRef.current) {
      applyThemeVars({
        preferences: liveValues as unknown as ThemePreferences,
        element: previewRef.current,
      });
    }
  }, [liveValues]);

  return (
    <div
      ref={previewRef as React.RefObject<HTMLDivElement>}
      data-theme={liveValues.mode}
      className={cn(
        "rounded-md border p-4 shadow-sm transition-all",
        "text-[var(--foreground)] bg-[var(--background)]",
        liveValues.mode
      )}
    >
      <div className="space-y-2">
        <h3 className="text-xl font-heading">Heading Preview</h3>
        <p className="text-base font-body leading-relaxed">
          This is a preview of your current theme settings including font, color, and mode.
        </p>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" className="flex-1">
            Primary
          </Button>
          <Button className="flex-1">Accent</Button>
        </div>
      </div>
    </div>
  );
}
