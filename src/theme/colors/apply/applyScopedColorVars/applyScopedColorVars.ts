import type { SemanticColor, ColorType } from "@/theme/colors/types";
import type { ThemeMode } from "@/theme/types";
import { generateColorVars } from "@/theme/colors/generate";
import { applyVars } from "@/theme/utils";

/**
 * Applies semantic color CSS variables to the <html> element.
 */
export function applyScopedColorVars(
	color: SemanticColor,
	mode: ThemeMode,
	prefix: ColorType,
	element: HTMLElement
) {
	const vars = generateColorVars(color, mode, prefix);
	applyVars(vars, element);
}
