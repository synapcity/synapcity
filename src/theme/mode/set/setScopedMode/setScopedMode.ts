import { useThemeStore } from "@/stores";
import type { EntityType } from "@/types/entity";
import { ThemeMode } from "@/theme/types";

export function setScopedMode(scope: EntityType, id: string, mode: ThemeMode) {
	useThemeStore.getState().setPreferences(scope, id, { mode });
}
