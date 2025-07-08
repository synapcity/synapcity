import { useThemeStore } from "@/stores";
import { DEFAULT } from "@/theme/defaults";
import { getDefaultTheme } from "../getDefaultTheme";
import { updateGlobalTheme, updateScopedTheme } from "../updateTheme";
import type { EntityType } from "@/theme/types/entity";

export function resetGlobalTheme() {
	updateGlobalTheme(DEFAULT.THEME, {});
}

export function resetScopedTheme(
	scope: EntityType,
	id: string,
	element: HTMLElement
) {
	const mode = useThemeStore.getState().globalPreferences.mode;
	const defaultTheme = getDefaultTheme(mode);
	updateScopedTheme(scope, id, defaultTheme, {}, element);
}
