import { COLOR_SHADE_KEYS } from "@/theme/constants";
import type { ColorShade } from "@/theme/types";

/**
 * Flips a color scale from light → dark to dark → light.
 */
export function reverseColorScale(
	scale: Record<ColorShade, string>
): Record<ColorShade, string> {
	const keys = COLOR_SHADE_KEYS;
	const reversed = [...keys].reverse();

	return Object.fromEntries(
		keys.map((k, i) => [k, scale[reversed[i]]] as const)
	) as Record<ColorShade, string>;
}
