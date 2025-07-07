"use client";

import { useThemeStore } from "@/stores";
import { applyColor } from "@/theme/colors";
import { applyFont } from "@/theme/font";
import { applyModeClass } from "@/theme/mode";
import { ThemePreferences } from "@/theme/types";
import { getUpdatedValues } from "@/utils";

export function updateGlobalTheme(updates: Partial<ThemePreferences>) {
	const set = useThemeStore.getState().setGlobalPreferences;
	const get = useThemeStore.getState().globalPreferences;
	const updatedValues = getUpdatedValues(get, updates);
	const names = new Set(Object.keys(updatedValues));
	if (names.size > 0) {
		set(updates);
	}

	if (names.has("primary") && updatedValues.primary) {
		applyColor.applyGlobalColorVars(updatedValues.primary, get.mode, "primary");
	}

	if (names.has("accent") && updatedValues.accent) {
		applyColor.applyGlobalColorVars(updatedValues.accent, get.mode, "accent");
	}

	if (names.has("fontSize") && updatedValues.fontSize) {
		applyFont.applyGlobalFontVars({
			postfix: "size",
			size: updatedValues.fontSize,
		});
	}

	if (names.has("fontFamilyBody") && updatedValues.fontFamilyBody) {
		applyFont.applyGlobalFontVars({
			postfix: "body",
			fontFamily: updatedValues.fontFamilyBody,
		});
	}

	if (names.has("fontFamiylHeading") && updatedValues.fontFamilyHeading) {
		applyFont.applyGlobalFontVars({
			postfix: "heading",
			fontFamily: updatedValues.fontFamilyHeading,
		});
	}

	if (names.has("mode") && updatedValues.mode) {
		applyModeClass.applyGlobalModeClass(updatedValues.mode);
	}
}
