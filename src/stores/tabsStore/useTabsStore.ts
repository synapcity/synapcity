import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createTabEntitySlice } from "./slices/createTabEntitySlice";
import { createTabUISlice } from "./slices/createTabUISlice";
import { createSelectionSlice, createStatusSlice } from "@/stores/slices";
import { TabsStore } from "./types";

export const useTabsStore = create<TabsStore>()(
	persist(
		(set, get, store) => ({
			...createTabEntitySlice(set, get, store),
			...createTabUISlice(set, get, store),
			...createSelectionSlice(set, get, store),
			...createStatusSlice(set, get, store),
		}),
		{
			name: "tabs-store",
			version: 1,
			partialize: (state) => ({
				tabs: state.tabs,
				activeTabIdByEntity: state.activeTabIdByEntity,
				dirtyTabIds: state.dirtyTabIds,
			}),
		}
	)
);
