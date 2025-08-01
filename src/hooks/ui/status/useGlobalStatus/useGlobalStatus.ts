"use client";

import { useUIStore } from "@/stores";

export function useGlobalStatus() {
	return useUIStore((s) => s.status);
}

export function useGlobalStatusFlags() {
	const status = useGlobalStatus();
	return {
		isSaving: status.isSaving,
		isLoading: status.isLoading,
		isDirty: false,
		error: status.error,
		lastSavedAt: status.lastSavedAt,
	};
}
