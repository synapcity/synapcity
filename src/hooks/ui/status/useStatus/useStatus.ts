"use client";

import { useUIStore } from "@/stores";

export function useStatus(id?: string) {
  return useUIStore((s) => s.getStatus(id));
}

export function useStatusFlags(type?: string, id?: string) {
  const status = useStatus(id);
  return {
    isSaving: status.isSaving,
    isLoading: status.isLoading,
    isDirty: status.isEditing || status.isDeleting || status.isSearching,
    error: status.error,
    lastSavedAt: status.lastSavedAt,
  };
}

export function useNoteStatus(noteId: string) {
  return useStatus(noteId);
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
  return useStatus(dashboardId);
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
