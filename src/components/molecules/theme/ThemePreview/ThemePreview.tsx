"use client";

import { useWatch, useFormContext } from "react-hook-form";
import { cn } from "@/utils";
import { ThemePreferencesFormValues } from "../schema";
import { ThemeScopeProvider } from "@/providers/ThemeScopeProvider";
import { Button } from "@/components";
import { ThemePreferences } from "@/theme/types";
import { useMemo } from "react";
import { generateSemanticColor } from "@/theme/colors/generate";
export function ThemePreview({ initialTheme }: { initialTheme: ThemePreferences }) {
  const { control } = useFormContext<ThemePreferencesFormValues>();

  const liveValues = useWatch({ control }) ?? {};

  const enrichedValues = useMemo(() => {
    if (!liveValues) return initialTheme;

    return {
      ...liveValues,
      primary: generateSemanticColor(liveValues.primary?.base || "#000"),
      accent: generateSemanticColor(liveValues.accent?.base || "#000"),
    };
  }, [
    liveValues,
    liveValues?.primary?.base,
    liveValues?.accent?.base,
  ]);

  return (
    <ThemeScopeProvider entityType="preview" previewPreferences={enrichedValues as ThemePreferences}>
      <div
        className={cn(
          "rounded-md border p-4 shadow-sm transition-all",
        )}
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
    </ThemeScopeProvider>
  );
}
