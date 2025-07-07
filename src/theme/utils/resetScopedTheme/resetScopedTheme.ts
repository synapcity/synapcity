import { updateScopedTheme } from "../updateScopedTheme";
import { useThemeStore } from "@/stores";
import { getDefaultTheme } from "../getDefaultTheme";
import type { EntityType } from "@/theme/types/entity";

export function resetScopedTheme(
	scope: EntityType,
	id: string,
	element: HTMLElement
) {
	const mode = useThemeStore.getState().globalPreferences.mode;
	const defaultTheme = getDefaultTheme(mode);
	updateScopedTheme(scope, id, defaultTheme, element);
}
