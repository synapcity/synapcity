"use client";

import {
	useRef,
	useEffect,
	useContext,
	useState,
	useCallback,
	RefObject,
} from "react";
import {
	resolveThemeMetadata,
	applyThemeVars,
	generateSemanticColor,
} from "@/theme";
import { useThemeStore } from "@/stores/themeStore/useThemeStore";
import { ThemeContext, ThemeContextType } from "./theme-context";
import { cn, getUpdatedValues } from "@/utils";
import isEqual from "lodash.isequal";
import type {
	ThemeScope,
	ThemeMode,
	ThemePreferences,
	FontFamilyName,
	FontSizeToken,
	EntityType,
} from "@/theme/types";
import { ThemePreferencesFormValues } from "@/components/molecules/theme/schema";

export const useScopedPreferences = (scope: EntityType, id: string) =>
	useThemeStore((s) => s.scopedPreferences?.[scope]?.[id]);

export const useGlobalPreferences = () =>
	useThemeStore((s) => s.globalPreferences);

export interface ThemeProviderProps {
	scope: ThemeScope;
	entityId?: string;
	className?: string;
	children: React.ReactNode;
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
	const hasRendered = useRef(false);

	const hasHydrated = useThemeStore((s) => s.hasHydrated);
	const hydratedScoped = useThemeStore((s) => s.scopedPreferences);
	const hydratedGlobal = useThemeStore((s) => s.globalPreferences);

	const {
		setGlobalPreferences,
		setPreferences,
		resetGlobalPreferences,
		resetScopedPreferences,
	} = useThemeStore();

	const {
		preferences,
		isGlobal,
		isScoped,
		isInherited,
		isCustom,
	} = hasHydrated
			? resolveThemeMetadata({
				entityType: scope,
				entityId,
				scopedPreferences: hydratedScoped,
				globalPreferences: hydratedGlobal,
			})
			: {
				preferences: {} as ThemePreferences,
				isGlobal: false,
				isScoped: false,
				isInherited: false,
				isCustom: false,
			};

	const scopedPrefs = entityId ? hydratedScoped?.[scope as EntityType]?.[entityId] : null;

	const [previewTheme, setPreviewTheme] = useState({});

	const previewRef = useRef<HTMLElement | null>(null);
	const targetRef = useRef<HTMLElement | null>(null);

	const updatePreview = (data: Partial<ThemePreferences>) => {
		setPreviewTheme((prev) => {
			const next = { ...prev, ...data };
			return isEqual(next, prev) ? prev : next;
		});
	};

	const setAndApplyPreview = useCallback((update: Partial<ThemePreferences>, element: HTMLElement) => {
		const next = { ...previewTheme, ...update } as ThemePreferences
		updatePreview(next);
		applyThemeVars({ preferences: next, element });
	}, [previewTheme])

	const setAndApply = useCallback((data: Partial<ThemePreferences>, isPreview = false) => {
		const element = (isPreview ? previewRef.current : targetRef.current)!;
		setAndApplyPreview(data, element);
	}, [setAndApplyPreview])

	const updateColor = (
		color: string,
		prefix: "primary" | "accent",
		isPreview = false
	) => {
		const newColor = generateSemanticColor(color);
		setAndApply({ [prefix]: newColor }, isPreview);
	};

	const updateFontSize = (fontSize: FontSizeToken, isPreview = false) => {
		setAndApply({ fontSize }, isPreview);
	};

	const updateFontFamily = (
		name: FontFamilyName,
		fontFamily: string,
		isPreview = false
	) => {
		setAndApply({ [name]: fontFamily }, isPreview);
	};

	const updateMode = (mode: ThemeMode, preview = false) => {
		const element = preview
			? previewRef.current
			: isGlobal
				? document.body
				: targetRef.current;

		const next = { ...previewTheme, mode } as ThemePreferences
		setAndApply({ mode }, preview)
		if (element) {
			applyThemeVars({ preferences: next, element });
		}
	};

	const updateTheme = () => {
		const updates = getUpdatedValues(preferences, previewTheme);
		if (!Object.keys(updates).length) return;

		const updated = { ...preferences, ...updates } as ThemePreferences

		setAndApply(updated)
		if (isGlobal) {
			setGlobalPreferences(updated)
			applyThemeVars({ preferences: updated, element: targetRef.current as HTMLDivElement });
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

	const applyTheme = useCallback((data: ThemePreferencesFormValues) => {
		const main = isGlobal ? document.body : targetRef.current;
		const prefs = { ...previewTheme, ...data } as ThemePreferences
		if (main) applyThemeVars({ preferences: prefs, element: main });
		if (previewRef.current)
			applyThemeVars({ preferences: prefs, element: targetRef.current as HTMLElement });
	}, [previewTheme, isGlobal]);

	useEffect(() => {
		if (hasHydrated) {
			setPreviewTheme(preferences);
		}
	}, [preferences, hasHydrated]);

	useEffect(() => {
		if (hasHydrated && !hasRendered.current) {
			setPreviewTheme(preferences)
			applyTheme(preferences as ThemePreferences)
			hasRendered.current = true;
		}
	}, [setAndApply, hasHydrated, preferences, applyTheme]);

	useEffect(() => {
		if (previewRef.current && hasRendered.current) {
			applyThemeVars({ preferences: previewTheme as ThemePreferences, element: previewRef.current });
		}
	}, [previewTheme]);

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
				previewTheme: previewTheme as ThemePreferences,
				prefs: scopedPrefs ?? hydratedGlobal,
				updatePrimaryColor: (c, p) => updateColor(c, "primary", p),
				updateAccentColor: (c, p) => updateColor(c, "accent", p),
				updateFontSize,
				updateFontFamily,
				updateMode,
				updateTheme,
				updatePreviewTheme: (data: ThemePreferences) => updatePreview(data as ThemePreferences),
				resetTheme,
				scope,
				id
			}}
		>
			<div
				ref={targetRef as RefObject<HTMLDivElement>}
				data-id={id}
				data-theme={preferences.mode}
				className={cn("size-full text-[var(--foreground)] bg-[var(--background)]", className, preferences.mode)}
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
