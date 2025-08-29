import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CommandMenuStore {
  open: boolean;
  setOpen: (open: boolean) => void;

  rawQuery: string;
  setRawQuery: (q: string) => void;
  clearQuery: () => void;

  page: number;
  setPage: (page: number) => void;

  recents: string[]; // entity ids
  addRecent: (id: string) => void;
  clearRecents: () => void;

  pins: string[];
  pin: (id: string) => void;
  unpin: (id: string) => void;
  isPinned: (id: string) => boolean;
}

export const useCommandMenuStore = create<CommandMenuStore>()(
  persist(
    (set, get) => ({
      open: false,
      setOpen: (open) => set({ open }),
      rawQuery: "",
      setRawQuery: (rawQuery) => set({ rawQuery }),
      clearQuery: () => set({ rawQuery: "" }),
      page: 1,
      setPage: (page) => set({ page }),

      recents: [],
      addRecent: (id) =>
        set((state) => {
          const next = state.recents.filter((r) => r !== id);
          next.unshift(id);
          return { recents: next.slice(0, 10) };
        }),
      clearRecents: () => set({ recents: [] }),

      pins: [],
      pin: (id) =>
        set((state) => ({ pins: Array.from(new Set([id, ...state.pins])).slice(0, 10) })),
      unpin: (id) => set((state) => ({ pins: state.pins.filter((pid) => pid !== id) })),
      isPinned: (id) => get().pins.includes(id),
    }),
    { name: "synapcity-command-menu", partialize: (s) => ({ recents: s.recents, pins: s.pins }) }
  )
);
