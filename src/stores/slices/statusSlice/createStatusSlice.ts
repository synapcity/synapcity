import type { StateCreator } from "zustand";
import { defaultStatus, toStatusKey } from "./statusHelpers";
import { UILocalStatus, StatusField } from "@/types/ui";

export interface StatusSlice {
	status: UILocalStatus;
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
export const createStatusSlice: StateCreator<
	StatusSlice,
	[],
	[],
	StatusSlice
> = (set, get) => ({
	status: {
		isLoading: false,
		isCreating: false,
		isSaving: false,
		isDeleting: false,
		isEditing: false,
		isSearching: false,
		isSyncing: false,
		error: null,
		lastSavedAt: null,
	},
	localStatus: {},

	getStatus: (type, id) => {
		if (type && id) {
			return {
				...defaultStatus,
				...(get().localStatus[type]?.[id] ?? {}),
			};
		}
		return { ...defaultStatus };
	},

	startStatus: (field, type, id) => {
		const key = toStatusKey(field);
		if (type && id) {
			set((state) => {
				const existingMap = state.localStatus[type] || {};
				const existingStatus = existingMap[id] || {};

				return {
					localStatus: {
						...state.localStatus,
						[type]: {
							...existingMap,
							[id]: {
								...defaultStatus,
								...existingStatus,
								[key]: true,
								error: null,
							},
						},
					},
				};
			});
		} else {
			set((state) => ({
				status: {
					...state.status,
					[key]: true,
					error: null,
				},
			}));
		}
	},

	finishStatus: (field, type, id) => {
		const key = toStatusKey(field);
		const time = field === "saving" ? new Date().toISOString() : undefined;
		if (type && id) {
			set((state) => {
				const local = state.localStatus[type] || {};
				const current = {
					...defaultStatus,
					...local[id],
					[key]: false,
					error: null,
					...(time && { lastSavedAt: time }),
				};
				const isClean =
					!current.isSaving &&
					!current.isLoading &&
					!current.isDeleting &&
					!current.isEditing &&
					!current.isSyncing &&
					!current.isCreating &&
					!current.error;
				const updatedType = { ...local };
				if (isClean) {
					delete updatedType[id];
				} else {
					updatedType[id] = current;
				}
				return {
					localStatus: {
						...state.localStatus,
						[type]: updatedType,
					},
				};
			});
		} else {
			set((state) => ({
				status: {
					...state.status,
					[key]: false,
					error: null,
					...(time && { lastSavedAt: time }),
				},
			}));
		}
	},

	failStatus: (field, error, type, id) => {
		const key = toStatusKey(field);
		if (type && id) {
			set((state) => {
				const local = state.localStatus[type] || {};
				return {
					localStatus: {
						...state.localStatus,
						[type]: {
							...local,
							[id]: {
								...defaultStatus,
								...local[id],
								[key]: false,
								error,
							},
						},
					},
				};
			});
		} else {
			set((state) => ({
				status: {
					...state.status,
					[key]: false,
					error,
				},
			}));
		}
	},

	clearError: (type, id) => {
		if (type && id) {
			set((state) => {
				const local = state.localStatus[type] || {};
				return {
					localStatus: {
						...state.localStatus,
						[type]: {
							...local,
							[id]: {
								...defaultStatus,
								...local[id],
								error: null,
							},
						},
					},
				};
			});
		} else {
			set((state) => ({
				status: {
					...state.status,
					error: null,
				},
			}));
		}
	},

	resetStatus: (type, id) => {
		if (type && id) {
			set((state) => {
				const local = state.localStatus[type] || {};
				return {
					localStatus: {
						...state.localStatus,
						[type]: {
							...local,
							[id]: { ...defaultStatus },
						},
					},
				};
			});
		} else {
			set(() => ({
				status: {
					isLoadingPage: false,
					isCreating: false,
					isSearching: false,
					isEditing: false,
					isDeleting: false,
					isSaving: false,
					isLoading: false,
					isSyncing: false,
					error: null,
					lastSavedAt: null,
				},
			}));
		}
	},
});
