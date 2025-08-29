"use client";

import { useEffect } from "react";
import type { ThemeMode, ThemePreferences } from "@/theme/types";
import { applyThemeVars } from "@/theme";

export function useApplyTheme(
  preferences: ThemePreferences | null,
  element: HTMLElement | null,
  modeOverride?: ThemeMode,
  hasHydrated = true
) {
  useEffect(() => {
    if (!hasHydrated) return;
    if (preferences && element) {
      applyThemeVars({ preferences, element, modeOverride });
    }
  }, [preferences, element, hasHydrated, modeOverride]);
}
