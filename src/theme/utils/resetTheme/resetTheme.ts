import { useThemeStore } from "@/stores";
import { getDefaultTheme } from "../getDefaultTheme";
import { updateGlobalTheme, updateScopedTheme } from "../updateTheme";
import type { EntityType } from "@/theme/types/entity";

type ResetThemeOptions =
	| { scope?: undefined; id?: undefined; element?: undefined }
	| { scope: EntityType; id: string; element: HTMLElement };

/**
 * Resets theme to default.
 * - Global if no `scope/id` provided.
 * - Scoped if `scope`, `id`, and `element` are provided.
 */
export function resetTheme(options: ResetThemeOptions = {}) {
	const store = useThemeStore.getState();
	const mode = store.globalPreferences.mode;

	const defaultTheme = getDefaultTheme(mode);

	if (options.scope && options.id && options.element) {
		const current =
			store.getPreferences(options.scope, options.id)?.preferences ?? {};
		updateScopedTheme(
			options.scope,
			options.id,
			current,
			defaultTheme,
			options.element
		);
	} else {
		updateGlobalTheme(defaultTheme, true);
	}
}
