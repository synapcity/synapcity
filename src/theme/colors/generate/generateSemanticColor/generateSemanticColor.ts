import type { SemanticColor } from "@/theme/colors/types";
import { generateColorScale } from "../generateColorScale";
import { reverseColorScale } from "../reverseColorScale";

/**
 * Generates a full SemanticColor from a single base hex string.
 */
export function generateSemanticColor(base: string): SemanticColor {
	const scale = generateColorScale(base);

	return {
		base,
		light: {
			background: scale["100"],
			foreground: scale["900"],
			scale,
		},
		dark: {
			background: scale["950"],
			foreground: scale["50"],
			scale: reverseColorScale(scale),
		},
	};
}
