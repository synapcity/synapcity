import { useThemeStore } from "@/stores";
import type { EntityType, ThemeMode } from "@/theme/types";

export function setGlobalMode(mode: ThemeMode) {
  useThemeStore.getState().setGlobalPreferences({ mode });
}

export function setScopedMode(scope: EntityType, id: string, mode: ThemeMode) {
  useThemeStore.getState().setPreferences(scope, id, { mode });
}
