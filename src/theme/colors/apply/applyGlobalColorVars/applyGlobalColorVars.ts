import type { SemanticColor, ColorType } from "@/theme/colors/types";
import type { ThemeMode } from "@/theme/types";
import { generateColorVars } from "@/theme/colors/generate";
import { applyVars } from "@/theme/utils/applyVars";

/**
 * Applies semantic color CSS variables to the <html> element.
 */
export function applyGlobalColorVars(
	color: SemanticColor,
	mode: ThemeMode,
	prefix: ColorType
) {
	const vars = generateColorVars(color, mode, prefix);
	const root = document.documentElement;
	applyVars(vars, root);
}
