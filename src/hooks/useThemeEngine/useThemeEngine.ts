"use client";

import { useCallback } from "react";
import {
	generateSemanticColor,
	applyColorVars,
	DEFAULT,
	applyThemeVars,
} from "@/theme";
import type {
	FontFamilyName,
	FontSizeToken,
	ThemePreferences,
	ThemeMode,
} from "@/theme/types";
import { getUpdatedValues } from "@/utils";

export function useThemeEngine({
	preferences,
	isGlobal,
	targetRef,
	persistGlobal,
	persistScoped,
}: {
	preferences: ThemePreferences;
	isGlobal: boolean;
	targetRef: React.RefObject<HTMLElement | null>;
	persistGlobal?: (prefs: ThemePreferences) => void;
	persistScoped?: (updates: Partial<ThemePreferences>) => void;
}) {
	const applyThemeStyles = useCallback(
		(prefs: Partial<ThemePreferences>, modeOverride?: ThemeMode) => {
			const element = (
				isGlobal ? document.body : targetRef.current
			) as HTMLElement;
			applyThemeVars({ preferences: prefs, element, modeOverride });
		},
		[isGlobal, targetRef]
	);

	const updateThemePreferences = useCallback(
		(updates: Partial<ThemePreferences>) => {
			const merged = { ...preferences, ...updates };
			const diff = getUpdatedValues(preferences, merged);
			if (!Object.keys(diff).length) return;

			const updated = { ...preferences, ...diff } as ThemePreferences;

			if (isGlobal && persistGlobal) persistGlobal(updated);
			else if (!isGlobal && persistScoped) persistScoped(diff);
		},
		[preferences, isGlobal, persistGlobal, persistScoped]
	);

	const updateColor = (color: string, prefix: "primary" | "accent") => {
		const newSemantic = generateSemanticColor(color);
		const element = isGlobal ? document.body : targetRef.current;
		const mode = preferences?.mode ?? (DEFAULT.MODE as ThemeMode);
		const updates = { [prefix]: newSemantic };
		updateThemePreferences(updates);
		applyColorVars(newSemantic, mode, prefix, element as HTMLElement);
	};

	const updateFontSize = (fontSize: FontSizeToken) => {
		updateThemePreferences({ fontSize });
		applyThemeStyles({ fontSize });
	};

	const updateFontFamily = (name: FontFamilyName, value: string) => {
		updateThemePreferences({ [name]: value });
		applyThemeStyles({ [name]: value });
	};

	const updateMode = (mode: ThemeMode) => {
		updateThemePreferences({ mode });
		applyThemeStyles({ mode });
	};

	return {
		applyThemeStyles,
		updateThemePreferences,
		updateColor,
		updateFontSize,
		updateFontFamily,
		updateMode,
	};
}
