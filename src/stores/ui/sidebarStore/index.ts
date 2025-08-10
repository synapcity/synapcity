import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createPanelRegistrySlice,
  createSidebarPrefsSlice,
  PanelRegistrySlice,
  SidebarPrefsSlice,
} from "./slices";

interface SidebarStore extends PanelRegistrySlice, SidebarPrefsSlice {}
export const useSidebarStore = create<SidebarStore>()(
  persist<SidebarStore>(
    (set, get, store) => ({
      ...createPanelRegistrySlice(set, get, store),
      ...createSidebarPrefsSlice(set, get, store),
    }),
    {
      name: "synapcity-sidebar-store",
      version: 1,
    }
  )
);

export * from "./types";
