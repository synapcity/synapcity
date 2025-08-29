// stores/useSearchMatchStore.ts
import { create } from "zustand";

interface Match {
  nodeKey: string;
  start: number;
  end: number;
}

interface SearchMatchState {
  matches: Match[];
  activeIndex: number;
  setMatches: (matches: Match[]) => void;
  nextMatch: () => void;
  prevMatch: () => void;
  setActiveIndex: (index: number) => void;
}

export const useSearchMatchStore = create<SearchMatchState>((set, get) => ({
  matches: [],
  activeIndex: 0,

  setMatches: (matches) =>
    set({
      matches,
      activeIndex: matches.length > 0 ? 0 : -1,
    }),

  nextMatch: () => {
    const { matches, activeIndex } = get();
    if (matches.length === 0) return;
    set({ activeIndex: (activeIndex + 1) % matches.length });
  },

  prevMatch: () => {
    const { matches, activeIndex } = get();
    if (matches.length === 0) return;
    set({ activeIndex: (activeIndex - 1 + matches.length) % matches.length });
  },

  setActiveIndex: (index) => set({ activeIndex: index }),
}));
