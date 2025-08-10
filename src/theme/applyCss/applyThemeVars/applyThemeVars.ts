import type { ThemePreferences, ThemeMode, FontSizeToken, SemanticColor } from "@/theme/types";
import { applyScopedFontVars, applyScopedModeVars } from "@/theme/applyCss";
import { applyColorVars } from "@/theme/applyCss";
import { DEFAULT } from "@/theme/defaults";
/**
 * Applies all relevant theme variables to a given element.
 */
export function applyThemeVars({
  preferences,
  element,
  modeOverride,
}: {
  preferences: Partial<ThemePreferences> | ThemePreferences;
  element: HTMLElement;
  modeOverride?: ThemeMode;
}) {
  const prefs = preferences;
  if (!element) return;
  const mode = modeOverride ?? preferences.mode ?? DEFAULT.MODE;
  if (mode && prefs.mode) {
    applyScopedModeVars(mode as ThemeMode, element);
  }

  if (prefs.primary) {
    applyColorVars(prefs.primary as SemanticColor, mode as ThemeMode, "primary", element);
  }

  if (prefs.accent) {
    applyColorVars(prefs.accent as SemanticColor, mode as ThemeMode, "accent", element);
  }

  if (prefs.fontSize) {
    applyScopedFontVars({
      element,
      postfix: "size",
      size: prefs.fontSize as FontSizeToken,
    });
  }

  if (prefs.fontFamilyBody) {
    applyScopedFontVars({
      element,
      postfix: "body",
      fontFamily: prefs.fontFamilyBody,
    });
  }

  if (prefs.fontFamilyHeading) {
    applyScopedFontVars({
      element,
      postfix: "heading",
      fontFamily: prefs.fontFamilyHeading,
    });
  }
}
