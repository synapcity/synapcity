import { StateCreator } from "zustand";

export interface ActiveSlice {
	activeByScope: Record<string, string | null>;
	setActive(scope: string, id: string | null): void;
	getActive(scope: string): string | null;
}

export const createActiveSlice: StateCreator<
	ActiveSlice,
	[],
	[],
	ActiveSlice
> = (set, get, _store) => ({
	activeByScope: {} as Record<string, string | null>,

	setActive(scope, id) {
		set((state) => ({
			activeByScope: {
				...state.activeByScope,
				[scope]: id,
			},
		}));
	},

	getActive(scope) {
		return get().activeByScope[scope] ?? null;
	},
});
