export type StatusField =
  | "searching"
  | "editing"
  | "deleting"
  | "saving"
  | "loading"
  | "fetching"
  | "creating"
  | "syncing";

export interface UILocalStatus {
  isCreating: boolean;
  isSearching: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  isSaving: boolean;
  isLoading: boolean;
  isSyncing: boolean;
  error: Error | string | null;
  lastSavedAt: string | null;
}

export interface UIStatus {
  isLoadingPage: boolean;
  isSaving: boolean;
  error: Error | string | null;
  lastSavedAt: string | null;
}

export type StatusKeys = keyof UILocalStatus;

export interface UIMessages {
  loading: string;
  success: string;
  error: string;
  entityId: string;
}
