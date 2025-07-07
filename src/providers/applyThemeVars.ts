import type { ThemePreferences, ThemeMode } from "@/theme/types";
import { applyVars } from "@/theme/applyCss";
import { generateColorVars } from "@/theme/generateCss";
import { applyScopedFontVars, applyScopedModeVars } from "@/theme/applyCss";

/**
 * Applies all relevant theme variables to a given element.
 */
export function applyThemeVars({
	preferences,
	element,
	modeOverride,
}: {
	preferences: ThemePreferences;
	element: HTMLElement;
	modeOverride?: ThemeMode;
}) {
	const mode = modeOverride ?? preferences.mode;

	// Apply mode class
	applyScopedModeVars(mode, element);

	// Apply color tokens
	applyVars(generateColorVars(preferences.primary, mode, "primary"), element);
	applyVars(generateColorVars(preferences.accent, mode, "accent"), element);

	// Apply font size
	applyScopedFontVars({
		element,
		postfix: "size",
		size: preferences.fontSize,
	});

	// Apply font families
	applyScopedFontVars({
		element,
		postfix: "body",
		fontFamily: preferences.fontFamilyBody,
	});

	applyScopedFontVars({
		element,
		postfix: "heading",
		fontFamily: preferences.fontFamilyHeading,
	});
}
