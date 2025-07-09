import type { SemanticColor } from "@/theme/types";
import { generateColorScale } from "../generateColorScale";
import { reverseColorScale } from "../reverseColorScale";

/**
 * Generates a full SemanticColor from a single base hex string.
 */
export function generateSemanticColor(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	base: any
): SemanticColor {
	console.log("[generateSemanticColor] scale", base);

	const scale = generateColorScale(base as string);
	console.log("[generateSemanticColor] scale", scale);

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
