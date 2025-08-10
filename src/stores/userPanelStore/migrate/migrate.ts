import { USER_PANEL_MODULES } from "@/components/panels/userPanelModules";
import type { UserPanelState } from "../userPanelStore/useUserPanelStore";
export const migrateUserPanelStore = (persistedState: unknown, version: number): UserPanelState => {
  const state = persistedState as UserPanelState;

  if (version < 1) {
    state.activeModuleId = USER_PANEL_MODULES[0].id;
  }

  return state;
};
