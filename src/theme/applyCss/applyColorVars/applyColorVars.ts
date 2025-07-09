import { generateColorVars } from "@/theme/generateCss";
import { applyVars } from "../applyVars";
import type { SemanticColor } from "@/theme/types";

export function applyGlobalColorVars(
	color: SemanticColor,
	mode: "light" | "dark",
	type: "primary" | "accent"
) {
	const colorVars = generateColorVars(color, mode, type);

	const mergedVars = {
		...colorVars,
		"--background": color[mode].background,
		"--foreground": color[mode].foreground,
	};

	applyVars(mergedVars, document.body);
}

export function applyScopedColorVars(
	color: SemanticColor,
	mode: "light" | "dark",
	type: "primary" | "accent",
	element: HTMLElement
) {
	const colorVars = generateColorVars(color, mode, type);

	const mergedVars = {
		...colorVars,
		"--background": color[mode].background,
		"--foreground": color[mode].foreground,
	};

	applyVars(mergedVars, element);
}
