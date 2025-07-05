import { EntityType } from "@/types/entity";
import { updateScopedTheme } from "../updateScopedTheme";
import { useThemeStore } from "@/stores";
import { getDefaultTheme } from "../getDefaultTheme";

export function resetScopedTheme(
	scope: EntityType,
	id: string,
	element: HTMLElement
) {
	const mode = useThemeStore.getState().globalPreferences.mode;
	const defaultTheme = getDefaultTheme(mode);
	updateScopedTheme(scope, id, defaultTheme, element);
}
