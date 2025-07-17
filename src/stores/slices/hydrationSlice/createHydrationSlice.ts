import type { StateCreator } from "zustand";
import { HydrationSlice } from "@/types/ui";

export const createHydrationSlice: StateCreator<
	HydrationSlice,
	[],
	[],
	HydrationSlice
> = (set) => ({
	hasHydrated: false,
	setHasHydrated: (hasHydrated) => set({ hasHydrated }),
});
