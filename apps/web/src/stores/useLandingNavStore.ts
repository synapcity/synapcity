import { create } from "zustand";

type LandingNavStore = {
  activeSection: number;
  scrollToSection: (index: number) => void;
  setActiveSection: (index: number) => void;
  setScrollToSection: (fn: (index: number) => void) => void;
};

export const useLandingNavStore = create<LandingNavStore>((set) => ({
  activeSection: 0,
  scrollToSection: () => {},
  setActiveSection: (index) => set({ activeSection: index }),
  setScrollToSection: (fn) => set({ scrollToSection: fn }),
}));
