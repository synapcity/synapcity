import { USER_PANEL_MODULES } from "@/components/panels/userPanelModules";
import { PanelModule } from "@/types/panels";
import debounce from "lodash.debounce";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { migrateUserPanelStore } from "../migrate";
import { ImperativePanelHandle } from "react-resizable-panels";
import { RefObject } from "react";

export interface UserPanelState {
	hasHydrated: boolean;
	setHasHydrated: (hasHydrated: boolean) => void;
	activeSection: PanelModule;
	setActiveSection: (section?: PanelModule) => void;
	customOrder: string[];
	setCustomOrder: (order: string[]) => void;
	resetOrderToDefault: () => void;
	panelRef?: RefObject<ImperativePanelHandle | null>;
	setPanelRef: (ref: RefObject<ImperativePanelHandle | null>) => void;
}

export const useUserPanelStore = create<UserPanelState>()(
	persist(
		(set) => {
			const debouncedSet = debounce((section?: PanelModule) => {
				set({ activeSection: section ?? USER_PANEL_MODULES[0] });
			}, 100);

			return {
				activeSection: USER_PANEL_MODULES[0],
				setActiveSection: (section) => {
					debouncedSet(section);
				},
				hasHydrated: false,
				setHasHydrated: (hasHydrated) => set({ hasHydrated }),
				customOrder: USER_PANEL_MODULES.map((m) => m.id),
				setCustomOrder: (order) => set({ customOrder: order }),
				resetOrderToDefault: () =>
					set({ customOrder: USER_PANEL_MODULES.map((m) => m.id) }),
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
				activeSection: state.activeSection,
				customOrder: state.customOrder,
			}),
		}
	)
);
