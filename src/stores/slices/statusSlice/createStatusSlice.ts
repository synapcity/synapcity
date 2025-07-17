import type { StateCreator } from "zustand";
import type { StatusSlice } from "@/types/ui";
import { defaultStatus, toStatusKey } from "./statusHelpers";

export const createStatusSlice: StateCreator<
	StatusSlice,
	[],
	[],
	StatusSlice
> = (set, get) => ({
	// global fallback status
	status: {
		isLoadingPage: false,
		isSaving: false,
		error: null,
		lastSavedAt: null,
	},
	// per-entity status: localStatus[entityType][entityId] → partial Status
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
				const local = state.localStatus[type] || {};
				return {
					localStatus: {
						...state.localStatus,
						[type]: {
							...local,
							[id]: {
								...defaultStatus,
								...local[id],
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
					isSearching: false,
					isEditing: false,
					isDeleting: false,
					isSaving: false,
					isLoading: false,
					error: null,
					lastSavedAt: null,
				},
			}));
		}
	},
});
