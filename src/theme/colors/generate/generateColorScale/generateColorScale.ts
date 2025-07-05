import { colord } from "colord";
import { COLOR_SHADE_KEYS } from "@/theme/colors/constants";
import type { ColorShade } from "@/theme/colors/types";

export function generateColorScale(base: string): Record<ColorShade, string> {
	if (!colord(base).isValid()) {
		console.warn(`[generateColorScale] Invalid base color: ${base}`);
		base = "#999999";
	}
	const tints = colord(base)
		.tints(6)
		.map((t) => t.toHex())
		.reverse();
	const shades = colord(base)
		.shades(5)
		.map((s) => s.toHex());

	const merged = [...tints, ...shades];

	return COLOR_SHADE_KEYS.reduce((acc, label, i) => {
		acc[label as ColorShade] = merged[i] ?? base;
		return acc;
	}, {} as Record<ColorShade, string>);
}
