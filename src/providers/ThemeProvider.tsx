/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useRef, useState, useEffect, RefObject, useContext, useCallback } from "react";
// import { useThemeStore } from "@/stores/themeStore/useThemeStore";
// import { resolveThemeMetadata } from "@/theme/utils/resolveThemeMetadata";
// import { FontFamilyName, FontSizeToken, ThemeMode, ThemePreferences, ThemeScope } from "@/theme";
// import { ThemeContext, ThemeContextType } from "./theme-context";
// import { applyGlobalColorVars, applyScopedColorVars } from "@/theme/colors/apply";
// import { generateSemanticColor } from "@/theme/colors/generate";
// import { applyGlobalFontVars, applyScopedFontVars } from "@/theme/font/apply";
// import { cn, getUpdatedValues } from "@/utils";
// import isEqual from "lodash.isequal";
// import { applyGlobalModeClass, applyScopedModeClass } from "@/theme/mode/apply";
// import { EntityType } from "@/types/entity";

// export interface ThemeProviderProps {
// 	scope: ThemeScope;
// 	entityId?: string;
// 	children: React.ReactNode;
// 	className?: string;
// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 	[key: string]: any;
// }

// export const ThemeProvider = ({
// 	scope,
// 	entityId,
// 	className,
// 	children,
// 	...props
// }: ThemeProviderProps) => {
// 	const hasRendered = useRef<boolean>(false)
// 	const { globalPreferences, scopedPreferences, getPreferences } = useThemeStore();
// 	const setGlobalPreferences = useThemeStore(state => state.setGlobalPreferences)
// 	const setScopedPreferences = useThemeStore(state => state.setPreferences)
// 	const resetGlobalTheme = useThemeStore(state => state.resetGlobalPreferences)
// 	const resetScopedTheme = useThemeStore(state => state.resetScopedPreferences)
// 	const hasHydrated = useThemeStore(state => state.hasHydrated)

// 	const { preferences, isGlobal, isInherited, isScoped, isCustom } = resolveThemeMetadata({
// 		entityType: scope,
// 		entityId,
// 		globalPreferences,
// 		scopedPreferences,
// 	});

// 	const [preview, setPreview] = useState(preferences);
// 	const previewRef = useRef<HTMLElement | null>(null);
// 	const targetRef = useRef<HTMLElement | null>(null);
// 	const scopedPrefs = getPreferences(scope, entityId).preferences

// 	const updatePreview = (data: Partial<ThemePreferences>) => {
// 		setPreview(prev => {
// 			const newPreview = { ...prev, ...data };
// 			if (!isEqual(newPreview, prev)) {
// 				return newPreview;
// 			}
// 			return prev;
// 		});
// 	};

// 	const updateColor = (color: string, prefix: "primary" | "accent", prev = false) => {
// 		const element = (preview ? previewRef.current : targetRef.current) as HTMLElement
// 		const colorData = generateSemanticColor(color);
// 		if (prev) {
// 			updatePreview({ [prefix]: colorData })
// 			applyScopedColorVars(colorData, preview.mode, prefix, element)
// 			return
// 		}

// 		if (isGlobal) {
// 			applyGlobalColorVars(colorData, preview.mode, prefix);
// 		} else {
// 			applyScopedColorVars(colorData, preview.mode, prefix, element);
// 		}

// 	};

// 	const updatePrimaryColor = (color: string, preview = false) => {
// 		updateColor(color, "primary", preview);
// 	};

// 	const updateAccentColor = (color: string, preview = false) => {
// 		updateColor(color, "accent", preview);
// 	};

// 	const updateFontSize = (fontSize: FontSizeToken, preview = false) => {
// 		const element = (preview ? previewRef.current : targetRef.current) as HTMLElement
// 		if (preview) {
// 			updatePreview({ fontSize });
// 			applyScopedFontVars({ postfix: "size", element, size: fontSize })
// 			return;
// 		}
// 		if (isGlobal) {
// 			applyGlobalFontVars({ postfix: "size", size: fontSize });
// 		} else {
// 			applyScopedFontVars({ postfix: "size", element, size: fontSize });
// 		}
// 	};

// 	const updateFontFamily = (name: FontFamilyName, fontFamily: string, preview = false) => {
// 		const element = (preview ? previewRef.current : targetRef.current) as HTMLElement

// 		const postfix = name === "fontFamilyHeading" ? "heading" : "body";
// 		if (preview) {
// 			updatePreview({ [name]: fontFamily })
// 			applyScopedFontVars({ postfix, element, fontFamily })
// 			return;
// 		}

// 		if (isGlobal) {
// 			applyGlobalFontVars({ postfix, fontFamily })
// 		} else {
// 			applyScopedFontVars({ postfix, element, fontFamily })
// 		}

// 	}

// 	const updateMode = (mode: ThemeMode, prev = false) => {
// 		const element = (prev ? previewRef.current : isGlobal ? document.body : targetRef.current) as HTMLElement
// 		if (prev) {
// 			updatePreview({ mode })
// 			applyScopedModeClass(mode, element)
// 			applyScopedColorVars(preview.primary, mode, "primary", element)
// 			applyScopedColorVars(preview.accent, mode, "accent", element)
// 			return;
// 		}
// 		if (isGlobal) {
// 			applyGlobalModeClass(mode)
// 			applyGlobalColorVars(preview.primary, preview.mode, "primary")
// 			applyGlobalColorVars(preview.accent, preview.mode, "accent")
// 		} else {
// 			applyScopedModeClass(mode, element)
// 			applyScopedColorVars(preview.primary, mode, "primary", element)
// 			applyScopedColorVars(preview.accent, mode, "accent", element)
// 		}
// 	}


// 	const resetTheme = () => {
// 		if (isGlobal) {
// 			resetGlobalTheme();
// 		} else if (entityId) {
// 			resetScopedTheme(
// 				scope as EntityType,
// 				entityId,
// 			);
// 		} else {
// 			console.warn(`entityId not passed in for ${scope}`);
// 		}
// 	};

// 	const applyGlobal = useCallback(() => {
// 		const prevElement = previewRef.current as HTMLElement
// 		applyGlobalModeClass(preferences.mode)
// 		applyGlobalFontVars({ size: preferences.fontSize, postfix: "size" })
// 		applyGlobalFontVars({ postfix: "body", fontFamily: preferences.fontFamilyBody })
// 		applyGlobalFontVars({ postfix: "heading", fontFamily: preview.fontFamilyHeading })
// 		applyGlobalColorVars(preview.primary, preview.mode, "primary")
// 		applyGlobalColorVars(preview.accent, preview.mode, "accent")
// 		if (prevElement) {
// 			applyScopedColorVars(preview.primary, preview.mode, "primary", prevElement)
// 			applyScopedColorVars(preview.primary, preview.mode, "accent", prevElement)
// 		}
// 	}, [preferences.fontFamilyBody, preferences.fontSize, preferences.mode, preview.accent, preview.fontFamilyHeading, preview.mode, preview.primary])

// 	const applyScoped = useCallback(() => {
// 		const element = targetRef.current as HTMLElement
// 		const prevElement = previewRef.current as HTMLElement
// 		applyScopedModeClass(preferences.mode, element)
// 		applyScopedFontVars({ postfix: "size", size: preferences.fontSize, element })
// 		applyScopedFontVars({ postfix: "body", fontFamily: preferences.fontFamilyBody, element })
// 		applyScopedFontVars({ postfix: "heading", fontFamily: preferences.fontFamilyHeading, element })
// 		applyScopedColorVars(preferences.primary, preview.mode, "primary", element)
// 		applyScopedColorVars(preferences.accent, preview.mode, "accent", element)
// 		if (prevElement) {
// 			applyScopedColorVars(preview.primary, preview.mode, "primary", prevElement)
// 			applyScopedColorVars(preview.accent, preview.mode, "accent", prevElement)
// 		}
// 	}, [preferences.mode, preferences.fontSize, preferences.fontFamilyBody, preferences.fontFamilyHeading, preferences.primary, preferences.accent, preview.primary, preview.mode, preview.accent])

// 	const updateTheme = () => {
// 		const updatedValues = getUpdatedValues(preferences, preview)
// 		const names = Object.getOwnPropertyNames(updatedValues)
// 		if (names.length > 0) {
// 			if (isGlobal) {
// 				setGlobalPreferences(updatedValues)
// 			} else {
// 				if (!entityId) {
// 					console.warn(`entityId not passed in for ${scope}`)
// 					return;
// 				}
// 				setScopedPreferences(scope as EntityType, entityId, updatedValues)
// 			}
// 			applyUpdatedVars(names, updatedValues)
// 		}
// 	}

// 	const applyUpdatedVars = (names: string[], values: Partial<ThemePreferences>) => {
// 		if (names.includes("mode") && values.mode) {
// 			updateMode(values.mode)
// 		} else if (names.includes("fontSize") && values.fontSize) {
// 			updateFontSize(values.fontSize)
// 		} else if (names.includes("fontFamilyHeading") && values.fontFamilyHeading) {
// 			updateFontFamily("fontFamilyHeading", values.fontFamilyHeading)
// 		} else if (names.includes("fontFamilyBody") && values.fontFamilyBody) {
// 			updateFontFamily("fontFamilyBody", values.fontFamilyBody)
// 		} else if (names.includes("primary") && values.primary) {
// 			updatePrimaryColor(values.primary.base)
// 		} else if (names.includes("accent") && values.accent) {
// 			updateAccentColor(values.accent.base)
// 		}
// 	}

// 	useEffect(() => {
// 		setPreview(preferences);
// 	}, [preferences]);

// 	useEffect(() => {
// 		if (hasHydrated && !hasRendered.current) {
// 			if (isGlobal) {
// 				applyGlobal()
// 			} else {
// 				applyScoped()
// 			}

// 			hasRendered.current = true
// 		}
// 	}, [applyGlobal, applyScoped, hasHydrated, isGlobal])

// 	const id = `${scope}-${entityId ?? "main"}`;

// 	return (
// 		<ThemeContext.Provider
// 			value={{
// 				previewRef,
// 				targetRef,
// 				isGlobal,
// 				isInherited,
// 				isScoped,
// 				preview,
// 				updatePrimaryColor,
// 				updateAccentColor,
// 				updateFontSize,
// 				updateFontFamily,
// 				updateMode,
// 				globalPrefs: globalPreferences,
// 				scopedPrefs,
// 				resetTheme,
// 				isCustom,
// 				updateTheme,
// 			}}
// 		>
// 			<div
// 				ref={targetRef as RefObject<HTMLDivElement>}
// 				data-id={id}
// 				data-theme={preferences.mode}
// 				className={cn(
// 					"size-full text-foreground bg-background",
// 					className,
// 					preferences.mode
// 				)}
// 				{...props}
// 			>
// 				{children}
// 			</div>
// 		</ThemeContext.Provider>
// 	);
// };

// export const useTheme = (): ThemeContextType => {
// 	const context = useContext(ThemeContext);
// 	if (!context) {
// 		throw new Error('useThemeContext must be used within a ThemeProvider');
// 	}
// 	return context;
// };
// theme/providers/ThemeProvider.tsx
"use client";

import {
	useRef,
	useEffect,
	useContext,
	useState,
	useCallback,
	RefObject,
} from "react";
import { useThemeStore } from "@/stores/themeStore/useThemeStore";
import { resolveThemeMetadata } from "@/theme/utils/resolveThemeMetadata";
import { applyThemeVars } from "./applyThemeVars";
import { ThemeContext, ThemeContextType } from "./theme-context";
import { generateSemanticColor } from "@/theme/generateValues/colors";
import { cn, getUpdatedValues } from "@/utils";
import isEqual from "lodash.isequal";
import type {
	ThemeScope,
	ThemeMode,
	ThemePreferences,
	FontFamilyName,
	FontSizeToken,
	EntityType
} from "@/theme/types";

export const useScopedPreferences = (scope: EntityType, id: string) =>
	useThemeStore((s) => s.scopedPreferences?.[scope]?.[id]);

export const useGlobalPreferences = () =>
	useThemeStore((s) => s.globalPreferences);

export interface ThemeProviderProps {
	scope: ThemeScope;
	entityId?: string;
	className?: string;
	children: React.ReactNode;
	[key: string]: any;
}

export const ThemeProvider = ({
	scope,
	entityId,
	className,
	children,
	...props
}: ThemeProviderProps) => {
	const hasRendered = useRef(false);

	const globalPreferences = useGlobalPreferences();
	const scopedPrefsFn = entityId ? useScopedPreferences : undefined;
	const scopedPrefs = scopedPrefsFn?.(scope as EntityType, entityId as string)

	const {
		setGlobalPreferences,
		setPreferences,
		resetGlobalPreferences,
		resetScopedPreferences,
		hasHydrated,
	} = useThemeStore();

	const {
		preferences,
		isGlobal,
		isScoped,
		isInherited,
		isCustom,
	} = resolveThemeMetadata({
		entityType: scope,
		entityId,
		scopedPreferences: useThemeStore.getState().scopedPreferences,
		globalPreferences,
	});

	const [preview, setPreview] = useState(preferences);

	const previewRef = useRef<HTMLElement | null>(null);
	const targetRef = useRef<HTMLElement | null>(null);

	const updatePreview = (data: Partial<ThemePreferences>) => {
		setPreview((prev) => {
			const next = { ...prev, ...data };
			return isEqual(next, prev) ? prev : next;
		});
	};

	const updateColor = (
		color: string,
		prefix: "primary" | "accent",
		isPreview = false
	) => {
		const newColor = generateSemanticColor(color);
		const element = (isPreview ? previewRef.current : targetRef.current)!;
		updatePreview({ [prefix]: newColor });
		applyThemeVars({ preferences: { ...preview, [prefix]: newColor }, element });
	};

	const updateFontSize = (fontSize: FontSizeToken, isPreview = false) => {
		const element = (isPreview ? previewRef.current : targetRef.current)!;
		updatePreview({ fontSize });
		applyThemeVars({ preferences: { ...preview, fontSize }, element });
	};

	const updateFontFamily = (
		name: FontFamilyName,
		fontFamily: string,
		isPreview = false
	) => {
		const element = (isPreview ? previewRef.current : targetRef.current)!;
		updatePreview({ [name]: fontFamily });
		applyThemeVars({ preferences: { ...preview, [name]: fontFamily }, element });
	};

	const updateMode = (mode: ThemeMode, isPreview = false) => {
		const element = isGlobal
			? document.body
			: (isPreview ? previewRef.current : targetRef.current)!;
		updatePreview({ mode });
		applyThemeVars({ preferences: { ...preview, mode }, element });
	};

	const updateTheme = () => {
		const updates = getUpdatedValues(preferences, preview);
		if (!Object.keys(updates).length) return;

		const updated = { ...preferences, ...updates };

		if (isGlobal) {
			setGlobalPreferences(updates);
			applyThemeVars({ preferences: updated, element: document.body });
		} else if (entityId) {
			setPreferences(scope as EntityType, entityId, updates);
			applyThemeVars({ preferences: updated, element: targetRef.current! });
		} else {
			console.warn(`Missing entityId for scoped update [${scope}]`);
		}
	};

	const resetTheme = () => {
		if (isGlobal) {
			resetGlobalPreferences();
		} else if (entityId) {
			resetScopedPreferences(scope as EntityType, entityId);
		} else {
			console.warn(`Missing entityId for scoped reset [${scope}]`);
		}
	};

	const applyTheme = useCallback(() => {
		const main = isGlobal ? document.body : targetRef.current;
		if (main) applyThemeVars({ preferences, element: main });
		if (previewRef.current)
			applyThemeVars({ preferences: preview, element: previewRef.current });
	}, [preferences, preview, isGlobal]);

	useEffect(() => {
		setPreview(preferences);
	}, [preferences]);

	useEffect(() => {
		if (hasHydrated && !hasRendered.current) {
			applyTheme();
			hasRendered.current = true;
		}
	}, [applyTheme, hasHydrated]);

	const id = `${scope}-${entityId ?? "main"}`;

	return (
		<ThemeContext.Provider
			value={{
				previewRef,
				targetRef,
				isGlobal,
				isInherited,
				isScoped,
				isCustom,
				preview,
				prefs: scopedPrefs ? scopedPrefs : globalPreferences,
				updatePrimaryColor: (c, p) => updateColor(c, "primary", p),
				updateAccentColor: (c, p) => updateColor(c, "accent", p),
				updateFontSize,
				updateFontFamily,
				updateMode,
				updateTheme,
				resetTheme,
			}}
		>
			<div
				ref={targetRef as RefObject<HTMLDivElement>}
				data-id={id}
				data-theme={preferences.mode}
				className={cn("size-full text-foreground bg-background", className, preferences.mode)}
				{...props}
			>
				{children}
			</div>
		</ThemeContext.Provider>
	);
};

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
};
