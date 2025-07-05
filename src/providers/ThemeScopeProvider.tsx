"use client";

import React, { RefObject, useEffect, useRef } from "react";
import type { EntityType } from "@/types/entity";
import { useThemeStore } from "@/stores/themeStore/useThemeStore";
import { ThemePreferences } from "@/theme/types";
import { cn } from "@/utils";
import { useThemePreferences } from "@/hooks";

interface ThemeScopeProviderProps {
	entityId?: string;
	entityType: EntityType | "global" | "preview";
	previewPreferences?: ThemePreferences
	children: React.ReactNode;
}

export const ThemeScopeProvider = ({
	entityId,
	entityType,
	previewPreferences,
	children,
}: ThemeScopeProviderProps) => {
	const ref = useRef<HTMLElement | HTMLDivElement>(null);
	let hasHydrated = useRef(false)
	const preferences = entityType === "preview" && previewPreferences ?
		previewPreferences :
		entityId && entityType !== "global" && entityType !== "preview"
			? useThemePreferences(entityType, entityId).preferences
			: useThemeStore((s) => s.globalPreferences)

	useEffect(() => {
		if (!hasHydrated.current) {
			hasHydrated.current = true
			ref.current = document.documentElement as HTMLElement
		}
	}, [hasHydrated])

	return (
		<div
			ref={ref as RefObject<HTMLDivElement>}
			data-scope={`${entityType}-${entityId ?? "main"}`}
			className={cn("size-full text-[var(--primary-foreground)] bg-[var(--primary-background)]", preferences.mode)}
			data-theme={preferences.mode}

		>
			{children}
		</div>
	);
};
