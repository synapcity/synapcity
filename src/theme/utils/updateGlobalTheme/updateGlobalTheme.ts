"use client";

import { useThemeStore } from "@/stores";
import {
	applyGlobalFontVars,
	applyGlobalModeVars,
	applyGlobalColorVars,
} from "@/theme/applyCss";
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
		applyGlobalColorVars(updatedValues.primary, get.mode, "primary");
	}

	if (names.has("accent") && updatedValues.accent) {
		applyGlobalColorVars(updatedValues.accent, get.mode, "accent");
	}

	if (names.has("fontSize") && updatedValues.fontSize) {
		applyGlobalFontVars({
			postfix: "size",
			size: updatedValues.fontSize,
		});
	}

	if (names.has("fontFamilyBody") && updatedValues.fontFamilyBody) {
		applyGlobalFontVars({
			postfix: "body",
			fontFamily: updatedValues.fontFamilyBody,
		});
	}

	if (names.has("fontFamilyHeading") && updatedValues.fontFamilyHeading) {
		applyGlobalFontVars({
			postfix: "heading",
			fontFamily: updatedValues.fontFamilyHeading,
		});
	}

	if (names.has("mode") && updatedValues.mode) {
		applyGlobalModeVars(updatedValues.mode);
	}
}
