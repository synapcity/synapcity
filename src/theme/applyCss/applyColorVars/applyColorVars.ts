import type { SemanticColor, ColorType } from "@/theme/types";
import type { ThemeMode } from "@/theme/types";
import { generateColorVars } from "@/theme/generateCss";
import { applyVars } from "../applyVars";

/**
 * Applies semantic color CSS variables to the <html> element.
 */
export function applyGlobalColorVars(
	color: SemanticColor,
	mode: ThemeMode,
	prefix: ColorType
) {
	const vars = generateColorVars(color, mode, prefix);
	const scale = mode === "dark" ? color.dark.scale : color.light.scale;
	vars[`--foreground`] = scale[900];
	vars[`--background`] = scale[100];
	const root = document.body;
	applyVars(vars, root);
}

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
