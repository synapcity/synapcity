"use client";

import { useThemeStore } from "@/stores/ui/themeStore";

export function useHydrated() {
	return useThemeStore((s) => s.hasHydrated);
}
