import type { StateCreator } from "zustand";

export interface DirtySlice {
	dirtyIds: string[];

	markDirty(id: string): void;
	clearDirty(id: string): void;
	isDirty(id: string): boolean;
}

export const createDirtySlice: StateCreator<DirtySlice, [], [], DirtySlice> = (
	set,
	get
) => ({
	dirtyIds: [],

	markDirty(id) {
		set((s) => ({
			dirtyIds: s.dirtyIds.includes(id) ? s.dirtyIds : [...s.dirtyIds, id],
		}));
	},

	clearDirty(id) {
		set((s) => ({
			dirtyIds: s.dirtyIds.filter((d) => d !== id),
		}));
	},

	isDirty(id) {
		return get().dirtyIds.includes(id);
	},
});
