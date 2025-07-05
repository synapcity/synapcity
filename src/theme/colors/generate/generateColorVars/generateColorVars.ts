import type { ColorType, SemanticColor } from "@/theme/colors/types";
import type { ThemeMode } from "@/theme/types";
import { COLOR_SHADE_KEYS } from "@/theme/colors/constants";

/**
 * Generates a flat record of CSS variables for a given semantic color.
 * Useful for scoped theming or inline style previews.
 */
export function generateColorVars(
	color: SemanticColor,
	mode: ThemeMode,
	prefix: ColorType
): Record<string, string> {
	const scale = mode === "dark" ? color.dark.scale : color.light.scale;

	const vars: Record<string, string> = {};

	COLOR_SHADE_KEYS.forEach((shade) => {
		vars[`--${prefix}-${shade}`] = scale[shade];
	});

	vars[`--${prefix}-foreground`] = color[mode].foreground;
	vars[`--${prefix}-background`] = color[mode].background;

	return vars;
}
