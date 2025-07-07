"use client";

import React, { useRef, useState, useEffect, RefObject, useContext, useCallback } from "react";
import { useThemeStore } from "@/stores/themeStore/useThemeStore";
import { resolveThemeMetadata } from "@/theme/utils/resolveThemeMetadata";
import { FontSizeToken, ThemeMode, ThemePreferences, ThemeScope } from "@/theme";
import { ThemeContext, ThemeContextType } from "./theme-context";
import { applyGlobalColorVars, applyScopedColorVars } from "@/theme/colors/apply";
import { generateSemanticColor } from "@/theme/colors/generate";
import { applyGlobalFontVars, applyScopedFontVars } from "@/theme/font/apply";
import { cn, getUpdatedValues } from "@/utils";
import isEqual from "lodash.isequal";
import { applyGlobalModeClass, applyScopedModeClass } from "@/theme/mode/apply";
import { EntityType } from "@/types/entity";
import { getDiff } from "@/utils"

export interface ThemeProviderProps {
	scope: ThemeScope;
	entityId?: string;
	children: React.ReactNode;
	className?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export const ThemeProvider = ({
	scope,
	entityId,
	className,
	children,
	...props
}: ThemeProviderProps) => {
	const hasRendered = useRef<boolean>(false)
	const { globalPreferences, scopedPreferences, getPreferences } = useThemeStore();
	const setGlobalPreferences = useThemeStore(state => state.setGlobalPreferences)
	const setScopedPreferences = useThemeStore(state => state.setPreferences)
	const resetGlobalTheme = useThemeStore(state => state.resetGlobalPreferences)
	const resetScopedTheme = useThemeStore(state => state.resetScopedPreferences)
	const hasHydrated = useThemeStore(state => state.hasHydrated)



	const { preferences, isGlobal, isInherited, isScoped, isCustom } = resolveThemeMetadata({
		entityType: scope,
		entityId,
		globalPreferences,
		scopedPreferences,
	});

	const [preview, setPreview] = useState(preferences);
	const previewRef = useRef<HTMLElement | null>(null);
	const targetRef = useRef<HTMLElement | null>(null);
	const scopedPrefs = getPreferences(scope, entityId).preferences


	// Function to update preview state
	const updatePreview = (data: Partial<ThemePreferences>) => {
		setPreview(prev => {
			const newPreview = { ...prev, ...data };
			if (!isEqual(newPreview, prev)) {
				return newPreview;
			}
			return prev;
		});
	};

	// Function to update the color (primary or accent)
	const updateColor = (color: string, prefix: "primary" | "accent", preview?: boolean) => {
		const colorData = generateSemanticColor(color);
		updatePreview({ [prefix]: colorData })
		const element = preview ? previewRef.current : targetRef.current

		if (isGlobal) {
			applyGlobalColorVars(colorData, preferences.mode, prefix);
			// setGlobalPreferences({ [prefix]: colorData }); // Uncomment if needed
		} else if (entityId && previewRef) {
			applyScopedColorVars(colorData, preferences.mode, prefix, element as HTMLElement);
			// setPreferences(scope as EntityType, entityId, { [prefix]: colorData }); // Uncomment if needed
		}

	};

	const updatePrimaryColor = (color: string, preview = false) => {
		updateColor(color, "primary", preview);
	};

	const updateAccentColor = (color: string) => {
		updateColor(color, "accent");
	};

	const updateFontSize = (fontSize: FontSizeToken, preview = false) => {
		updatePreview({ fontSize });
		const element = (preview ? previewRef.current : targetRef.current) as HTMLElement
		if (isGlobal) {
			applyGlobalFontVars({ postfix: "size", size: fontSize });
			if (!preview) {
				setGlobalPreferences({ fontSize })
			}
		} else if (entityId && previewRef) {
			applyScopedFontVars({ postfix: "size", element, size: fontSize });
			if (!preview) {
				setScopedPreferences(scope as EntityType, entityId, { fontSize })
			}
		}
	};

	const updateMode = (mode: ThemeMode, preview = false) => {
		if (preview) {
			updatePreview({ mode })
			return;
		}
		if (isGlobal) {
			applyGlobalModeClass(mode)
		} else {
			applyScopedModeClass(mode, targetRef.current as HTMLElement)
		}
	}

	const resetTheme = () => {
		if (isGlobal) {
			resetGlobalTheme();
		} else {
			resetScopedTheme(scope as EntityType, id)
		}
	}

	const applyGlobal = useCallback(() => {
		applyGlobalModeClass(preferences.mode)
	}, [preferences.mode])

	const updateTheme = () => {
		const updatedValues = getUpdatedValues(preferences, preview)
		const names = Object.getOwnPropertyNames(updatedValues)
		console.log("names", names)
		if (names.length !== 1) {
			if (isGlobal) {
				setGlobalPreferences(updatedValues)
			} else {
				if (!entityId) {
					console.warn(`entityId not passed in for ${scope}`)
					return;
				}
				setScopedPreferences(scope as EntityType, entityId, updatedValues)
			}
			applyUpdatedVars(names, updatedValues)
		}
	}

	const applyUpdatedVars = (names: string[], values: Partial<ThemePreferences>) => {
		if (names.includes("mode") && values.mode) {
			updateMode(values.mode)
		}
	}
	const getDiffValues = () => {
		return getDiff(preview, preferences)
	}

	useEffect(() => {
		setPreview(preferences);
	}, [preferences]);

	useEffect(() => {
		if (hasHydrated && !hasRendered.current) {
			applyGlobal()
			hasRendered.current = true
		}
	}, [applyGlobal, hasHydrated])

	const id = `${scope}-${entityId ?? "main"}`;

	return (
		<ThemeContext.Provider
			value={{
				previewRef,
				targetRef,
				isGlobal,
				isInherited,
				isScoped,
				preview,
				updatePrimaryColor,
				updateAccentColor,
				updateFontSize,
				updateMode,
				globalPrefs: globalPreferences,
				scopedPrefs,
				resetTheme,
				isCustom,
				getDiffValues,
				updateTheme,
			}}
		>
			<div
				ref={targetRef as RefObject<HTMLDivElement>}
				data-id={id}
				className={cn(
					"size-full text-foreground bg-background",
					className
				)}
				{...props}
			>
				{children}
			</div>
		</ThemeContext.Provider>
	);
};

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useThemeContext must be used within a ThemeProvider');
	}
	return context;
};
