import { useThemeStore } from "@/stores";
import {
	applyScopedFontVars,
	applyScopedModeVars,
	applyScopedColorVars,
} from "@/theme/applyCss";
import type { EntityType, ThemePreferences } from "@/theme/types";

export function updateScopedTheme(
	scope: EntityType,
	id: string,
	updates: Partial<ThemePreferences>,
	element: HTMLElement
) {
	const rawScoped = useThemeStore.getState().scopedPreferences[scope]?.[id];

	if (rawScoped?.inheritsFromGlobalTheme) return;

	useThemeStore.getState().setPreferences(scope, id, updates);
	const updated = useThemeStore
		.getState()
		.getPreferences(scope, id).preferences;

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
