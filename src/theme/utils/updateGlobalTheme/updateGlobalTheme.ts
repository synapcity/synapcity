import { useThemeStore } from "@/stores";
import { applyColor } from "@/theme/colors";
import { applyFont } from "@/theme/font";
import { applyModeClass } from "@/theme/mode";
import { ThemePreferences } from "@/theme/types";

const { applyGlobalFontVars } = applyFont;
const { applyGlobalColorVars } = applyColor;
const { applyGlobalModeClass } = applyModeClass;
export function updateGlobalTheme(updates: Partial<ThemePreferences>) {
	const set = useThemeStore.getState().setGlobalPreferences;
	set(updates);

	const preferences = useThemeStore.getState().globalPreferences;

	applyGlobalColorVars(preferences.primary, preferences.mode, "primary");
	applyGlobalColorVars(preferences.accent, preferences.mode, "accent");

	applyGlobalFontVars({ postfix: "size", size: preferences.fontSize });
	applyGlobalFontVars({
		postfix: "body",
		fontFamily: preferences.fontFamilyBody,
	});
	applyGlobalFontVars({
		postfix: "heading",
		fontFamily: preferences.fontFamilyHeading,
	});

	applyGlobalModeClass(preferences.mode);
}
