import type { StateCreator } from "zustand";

export interface HydrationSlice {
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const createHydrationSlice: StateCreator<HydrationSlice, [], [], HydrationSlice> = (
  set
) => ({
  hasHydrated: false,
  setHasHydrated: (hasHydrated) => set({ hasHydrated }),
});
