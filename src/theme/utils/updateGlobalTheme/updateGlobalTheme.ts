import { useThemeStore } from "@/stores";
import { applyColor } from "@/theme/colors";
import { applyFont } from "@/theme/font";
import { applyModeClass } from "@/theme/mode";
import { ThemePreferences } from "@/theme/types";

export function updateGlobalTheme(updates: Partial<ThemePreferences>) {
	const set = useThemeStore.getState().setGlobalPreferences;
	set(updates);

	const preferences = useThemeStore.getState().globalPreferences;

	applyColor.applyGlobalColorVars(
		preferences.primary,
		preferences.mode,
		"primary"
	);
	applyColor.applyGlobalColorVars(
		preferences.accent,
		preferences.mode,
		"accent"
	);

	applyFont.applyGlobalFontVars({
		postfix: "size",
		size: preferences.fontSize,
	});
	applyFont.applyGlobalFontVars({
		postfix: "body",
		fontFamily: preferences.fontFamilyBody,
	});
	applyFont.applyGlobalFontVars({
		postfix: "heading",
		fontFamily: preferences.fontFamilyHeading,
	});

	applyModeClass.applyGlobalModeClass(preferences.mode);
}
