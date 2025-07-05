import { useThemeStore } from "@/stores";
import { ThemeMode } from "@/theme/types";

export function setGlobalMode(mode: ThemeMode) {
	useThemeStore.getState().setGlobalPreferences({ mode });
}
