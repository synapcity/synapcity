import { create } from "zustand";

export interface SidePanelState {
	activePersistentKey: string | null;
	openSidebarForNode: (persistentKey: string) => void;
	closeSidebar: () => void;
}

export const useSidePanelStore = create<SidePanelState>((set) => ({
	activePersistentKey: null,
	openSidebarForNode: (persistentKey) =>
		set({ activePersistentKey: persistentKey }),
	closeSidebar: () => set({ activePersistentKey: null }),
}));
