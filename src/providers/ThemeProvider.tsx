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

	const updatePreview = (data: Partial<ThemePreferences>) => {
		setPreview(prev => {
			const newPreview = { ...prev, ...data };
			if (!isEqual(newPreview, prev)) {
				return newPreview;
			}
			return prev;
		});
	};

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
		if (preview) {
			updatePreview({ fontSize });
			applyScopedFontVars({ postfix: "size", element: previewRef.current as HTMLElement, size: fontSize })
			return;
		}
		if (isGlobal) {
			applyGlobalFontVars({ postfix: "size", size: fontSize });
		} else {
			applyScopedFontVars({ postfix: "size", element: targetRef.current as HTMLElement, size: fontSize });
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
		} else if (entityId) {
			resetScopedTheme(
				scope as EntityType,
				entityId,
			);
		} else {
			console.warn(`entityId not passed in for ${scope}`);
		}
	};

	const applyGlobal = useCallback(() => {
		applyGlobalModeClass(preferences.mode)
		applyGlobalFontVars({ size: preferences.fontSize, postfix: "size" })
	}, [preferences.fontSize, preferences.mode])

	const applyScoped = useCallback(() => {
		const element = targetRef.current as HTMLElement
		applyScopedModeClass(preferences.mode, element)
		applyScopedFontVars({ postfix: "size", size: preferences.fontSize, element })
	}, [preferences.fontSize, preferences.mode])

	const updateTheme = () => {
		const updatedValues = getUpdatedValues(preferences, preview)
		const names = Object.getOwnPropertyNames(updatedValues)
		if (names.length > 0) {
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
		} else if (names.includes("fontSize") && values.fontSize) {
			updateFontSize(values.fontSize)
		}
	}

	useEffect(() => {
		setPreview(preferences);
	}, [preferences]);

	useEffect(() => {
		if (hasHydrated && !hasRendered.current) {
			if (isGlobal) {
				applyGlobal()
			} else {
				applyScoped()
			}

			hasRendered.current = true
		}
	}, [applyGlobal, applyScoped, hasHydrated, isGlobal])

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
				updateTheme,
			}}
		>
			<div
				ref={targetRef as RefObject<HTMLDivElement>}
				data-id={id}
				data-theme={preferences.mode}
				className={cn(
					"size-full text-foreground bg-background",
					className,
					preferences.mode
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
