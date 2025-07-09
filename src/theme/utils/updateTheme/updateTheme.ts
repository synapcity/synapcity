import {
	applyGlobalFontVars,
	applyGlobalModeVars,
	applyGlobalColorVars,
	applyScopedFontVars,
	applyScopedModeVars,
	applyScopedColorVars,
} from "@/theme/applyCss";
import { useThemeStore } from "@/stores";
import { getUpdatedValues } from "@/utils";
import type { EntityType, ThemePreferences } from "@/theme/types";
import { DEFAULT } from "@/theme/defaults";

export function updateScopedTheme(
	scope: EntityType,
	id: string,
	preferences: ThemePreferences,
	updates: Partial<ThemePreferences>,
	element: HTMLElement
) {
	const updated = { ...preferences, ...updates };

	useThemeStore.getState().setPreferences(scope, id, updates);

	applyScopedColorVars(updated.primary, updated.mode, "primary", element);
	applyScopedColorVars(updated.accent, updated.mode, "accent", element);

	applyScopedFontVars({ postfix: "size", size: updated.fontSize, element });
	applyScopedFontVars({
		postfix: "body",
		fontFamily: updated.fontFamilyBody,
		element,
	});
	applyScopedFontVars({
		postfix: "heading",
		fontFamily: updated.fontFamilyHeading,
		element,
	});

	applyScopedModeVars(updated.mode, element);
}

export function updateGlobalTheme(
	updates: Partial<ThemePreferences>,
	overrideAll = false
) {
	const store = useThemeStore.getState();
	const current = store.globalPreferences;

	const updated = overrideAll
		? { ...DEFAULT.THEME, ...updates }
		: { ...current, ...getUpdatedValues(current, updates) };

	store.setGlobalPreferences(updated);

	applyGlobalColorVars(updated.primary, updated.mode, "primary");
	applyGlobalColorVars(updated.accent, updated.mode, "accent");

	applyGlobalFontVars({ postfix: "size", size: updated.fontSize });
	applyGlobalFontVars({
		postfix: "body",
		fontFamily: updated.fontFamilyBody,
	});
	applyGlobalFontVars({
		postfix: "heading",
		fontFamily: updated.fontFamilyHeading,
	});

	applyGlobalModeVars(updated.mode);
}
