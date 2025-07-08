import type { ThemePreferences, ThemeMode } from "@/theme/types";
import { applyVars } from "@/theme/applyCss/applyVars";
import { generateColorVars } from "@/theme/generateCss/generateColorVars";
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

	applyScopedModeVars(mode, element);

	applyVars(generateColorVars(preferences.primary, mode, "primary"), element);
	applyVars(generateColorVars(preferences.accent, mode, "accent"), element);

	applyScopedFontVars({
		element,
		postfix: "size",
		size: preferences.fontSize,
	});

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
