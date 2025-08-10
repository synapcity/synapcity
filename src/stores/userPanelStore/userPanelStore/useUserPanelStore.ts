import { USER_PANEL_MODULES } from "@/components/panels/userPanelModules";
import debounce from "lodash.debounce";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { migrateUserPanelStore } from "../migrate";
import { ImperativePanelHandle } from "react-resizable-panels";
import { RefObject } from "react";

export interface UserPanelState {
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  activeModuleId: string;
  setActiveModuleId: (id?: string) => void;
  customOrder: string[];
  setCustomOrder: (order: string[]) => void;
  resetOrderToDefault: () => void;
  panelRef?: RefObject<ImperativePanelHandle | null>;
  setPanelRef: (ref: RefObject<ImperativePanelHandle | null>) => void;
}

export const useUserPanelStore = create<UserPanelState>()(
  persist(
    (set) => {
      const debouncedSet = debounce((id?: string) => {
        set({ activeModuleId: id ?? USER_PANEL_MODULES[0].id });
      }, 100);

      return {
        activeModuleId: USER_PANEL_MODULES[0].id,
        setActiveModuleId: (id) => {
          debouncedSet(id);
        },
        hasHydrated: false,
        setHasHydrated: (hasHydrated) => set({ hasHydrated }),
        customOrder: USER_PANEL_MODULES.map((m) => m.id),
        setCustomOrder: (order) => set({ customOrder: order }),
        resetOrderToDefault: () => set({ customOrder: USER_PANEL_MODULES.map((m) => m.id) }),
        panelRef: undefined,
        setPanelRef: (panelRef) => set({ panelRef }),
      };
    },
    {
      name: "user-panel-store",
      version: 2,
      migrate: migrateUserPanelStore,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        activeModuleId: state.activeModuleId,
        customOrder: state.customOrder,
      }),
    }
  )
);
