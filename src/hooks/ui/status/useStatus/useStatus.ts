"use client";

import { useUIStore } from "@/stores";

export function useStatus(type?: string, id?: string) {
	return useUIStore((s) => s.getStatus(type, id));
}

export function useStatusFlags(type?: string, id?: string) {
	const status = useStatus(type, id);
	return {
		isSaving: status.isSaving,
		isLoading: status.isLoading,
		isDirty: status.isEditing || status.isDeleting || status.isSearching,
		error: status.error,
		lastSavedAt: status.lastSavedAt,
	};
}

export function useNoteStatus(noteId: string) {
	return useStatus("note", noteId);
}

export function useNoteStatusFlags(noteId: string) {
	const status = useNoteStatus(noteId);
	return {
		isSaving: status.isSaving,
		isLoading: status.isLoading,
		isDirty: status.isEditing || status.isDeleting || status.isSearching,
		error: status.error,
		lastSavedAt: status.lastSavedAt,
	};
}

export function useDashboardStatus(dashboardId: string) {
	return useStatus("dashboard", dashboardId);
}

export function useDashboardStatusFlags(dashboardId: string) {
	const status = useDashboardStatus(dashboardId);
	return {
		isSaving: status.isSaving,
		isLoading: status.isLoading,
		isDirty: status.isEditing || status.isDeleting || status.isSearching,
		error: status.error,
		lastSavedAt: status.lastSavedAt,
	};
}
