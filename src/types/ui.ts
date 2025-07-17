export type StatusField =
	| "searching"
	| "editing"
	| "deleting"
	| "saving"
	| "loading";

export interface UILocalStatus {
	isSearching: boolean;
	isEditing: boolean;
	isDeleting: boolean;
	isSaving: boolean;
	isLoading: boolean;
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

export interface StatusSlice {
	status: UIStatus;
	localStatus: Record<string, Record<string, UILocalStatus>>;
	getStatus: (type?: string, id?: string) => UILocalStatus;
	startStatus: (field: StatusField, type?: string, id?: string) => void;
	finishStatus: (field: StatusField, type?: string, id?: string) => void;
	failStatus: (
		field: StatusField,
		error: Error,
		type?: string,
		id?: string
	) => void;
	clearError: (type?: string, id?: string) => void;
	resetStatus: (type?: string, id?: string) => void;
}

export interface SelectionSlice {
	selected: Record<string, string | null>;
	setSelected: (scope: string, id: string | null) => void;

	sidebar: Record<string, { activeItem: string | null }>;
	setSidebarItem: (scope: string, item: string | null) => void;

	clearSelected: (scope?: string) => void;
	clearSidebarItem: (scope?: string) => void;
	getSelected?: (scope: string) => string | null;
}

export interface HydrationSlice {
	hasHydrated: boolean;
	setHasHydrated: (hasHydrated: boolean) => void;
}
