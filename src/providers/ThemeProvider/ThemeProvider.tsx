"use client";

import {
	useRef,
	RefObject,
	useEffect,
} from "react";
import { useThemeStore } from "@/stores/themeStore/useThemeStore/useThemeStore";
import { ThemeContext } from "./theme-context";
import { cn } from "@/utils";
import { useThemeEngine } from "@/hooks/theme/useThemeEngine";
import type {
	ThemeScope,
	ThemePreferences,
	EntityType,
} from "@/theme/types";
import { Spinner } from "@/components";
import { resolveThemeMetadata, applyThemeVars } from "@/theme";

export const ThemeProvider = ({
	scope,
	entityId,
	className,
	children,
	...props
}: {
	scope: ThemeScope;
	entityId?: string;
	className?: string;
	children: React.ReactNode;
}) => {
	const hasHydrated = useThemeStore((s) => s.hasHydrated);
	const hydratedScoped = useThemeStore((s) => s.scopedPreferences);
	const hydratedGlobal = useThemeStore((s) => s.globalPreferences);
	const setGlobalPreferences = useThemeStore((s) => s.setGlobalPreferences);
	const setPreferences = useThemeStore((s) => s.setPreferences);
	const resetGlobalPreferences = useThemeStore((s) => s.resetGlobalPreferences);
	const resetScopedPreferences = useThemeStore((s) => s.resetScopedPreferences);

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

	const scopedPrefs = entityId
		? hydratedScoped?.[scope as EntityType]?.[entityId]
		: null;
	const targetRef = useRef<HTMLElement | null>(null);

	const {
		updateThemePreferences,
		applyThemeStyles,
		updateColor,
		updateFontSize,
		updateFontFamily,
		updateMode,
	} = useThemeEngine({
		preferences,
		isGlobal,
		targetRef,
		persistGlobal: setGlobalPreferences,
		persistScoped: (updates) => {
			if (entityId) setPreferences(scope as EntityType, entityId, updates);
		},
	});

	const resetTheme = () => {
		if (isGlobal) {
			resetGlobalPreferences();
		} else if (entityId) {
			resetScopedPreferences(scope as EntityType, entityId);
		}
	};

	const id = `${scope}-${entityId ?? "main"}`;

	useEffect(() => {
		if (hasHydrated) {
			applyThemeStyles(preferences);
		}
	}, [applyThemeStyles, hasHydrated, preferences]);

	useEffect(() => {
		const el = isGlobal ? document.body : targetRef.current;
		if (el) {
			applyThemeVars({ preferences, element: el });
		}
	}, [preferences, isGlobal]);

	if (!hasHydrated) return <Spinner />;

	return (
		<ThemeContext.Provider
			value={{
				targetRef,
				isGlobal,
				isInherited,
				isScoped,
				isCustom,
				prefs: scopedPrefs ?? hydratedGlobal,
				updatePrimaryColor: (c) => updateColor(c, "primary"),
				updateAccentColor: (c) => updateColor(c, "accent"),
				updateFontSize,
				updateFontFamily,
				updateMode,
				resetTheme,
				updateThemePreferences,
				applyThemeStyles,
				scope,
				id,
				element: isGlobal ? document.body : targetRef.current,
			}}
		>
			<div
				ref={targetRef as RefObject<HTMLDivElement>}
				data-id={id}
				data-theme={preferences.mode}
				data-testid="theme-wrapper"
				className={cn(
					"size-full text-[var(--foreground)] bg-[var(--background)]",
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
