import { DEFAULT } from "@/theme/defaults";
import type { ThemeMode, ThemePreferences } from "@/theme/types";

export function getDefaultTheme(mode: ThemeMode): ThemePreferences {
	return {
		...DEFAULT.THEME,
		mode,
	};
}
