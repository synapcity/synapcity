import type { StateCreator } from "zustand";
import { defaultStatus, toStatusKey } from "./statusHelpers";
import { UILocalStatus, StatusField } from "@/types/ui";

const GLOBAL_KEY = "__global";

export interface StatusSlice {
	status: Record<string, UILocalStatus>;
	getStatus: (id?: string) => UILocalStatus;
	startStatus: (field: StatusField, id?: string) => void;
	finishStatus: (field: StatusField, id?: string) => void;
	failStatus: (field: StatusField, error: Error, id?: string) => void;
	clearError: (id?: string) => void;
	resetStatus: (id?: string) => void;
}

export const createStatusSlice: StateCreator<
	StatusSlice,
	[],
	[],
	StatusSlice
> = (set, get) => ({
	status: {},

	getStatus: (id) => {
		const key = id ?? GLOBAL_KEY;
		return {
			...defaultStatus,
			...(get().status?.[key] ?? {}),
		};
	},

	startStatus: (field, id) => {
		const key = toStatusKey(field);
		const target = id ?? GLOBAL_KEY;

		set((state) => {
			const existing = state.status[target] ?? {};
			return {
				status: {
					...state.status,
					[target]: {
						...defaultStatus,
						...existing,
						[key]: true,
						error: null,
					},
				},
			};
		});
	},

	finishStatus: (field, id) => {
		const key = toStatusKey(field);
		const time = field === "saving" ? new Date().toISOString() : undefined;
		const target = id ?? GLOBAL_KEY;

		set((state) => {
			const prev = state.status[target] ?? {};
			const current: UILocalStatus = {
				...defaultStatus,
				...prev,
				[key]: false,
				error: null,
				...(time && { lastSavedAt: time }),
			} as UILocalStatus;

			const isClean =
				!current.isSaving &&
				!current.isLoading &&
				!current.isDeleting &&
				!current.isEditing &&
				!current.isSyncing &&
				!current.isCreating &&
				!current.error;

			const newStatus = { ...state.status };
			if (isClean) {
				delete newStatus[target];
			} else {
				newStatus[target] = current;
			}

			return {
				status: newStatus,
			};
		});
	},

	failStatus: (field, error, id) => {
		const key = toStatusKey(field);
		const target = id ?? GLOBAL_KEY;

		set((state) => {
			const existing = state.status[target] ?? {};
			return {
				status: {
					...state.status,
					[target]: {
						...defaultStatus,
						...existing,
						[key]: false,
						error,
					},
				},
			};
		});
	},

	clearError: (id) => {
		const target = id ?? GLOBAL_KEY;
		set((state) => {
			const existing = state.status[target] ?? {};
			return {
				status: {
					...state.status,
					[target]: {
						...defaultStatus,
						...existing,
						error: null,
					},
				},
			};
		});
	},

	resetStatus: (id) => {
		const target = id ?? GLOBAL_KEY;
		set((state) => ({
			status: {
				...state.status,
				[target]: { ...defaultStatus },
			},
		}));
	},
});
