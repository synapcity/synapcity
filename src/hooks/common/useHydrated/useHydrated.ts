"use client";

import { useThemeStore } from "@/stores/themeStore";

export function useHydrated() {
	return useThemeStore((s) => s.hasHydrated);
}
