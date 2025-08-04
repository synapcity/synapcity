import { generateColorVars } from "@/theme/generateCss";
import { applyVars } from "../applyVars";
import type { SemanticColor } from "@/theme/types";

export function applyColorVars(
	color: SemanticColor,
	mode: "light" | "dark",
	type: "primary" | "accent",
	element: HTMLElement
) {
	const colorVars = generateColorVars(color, mode, type);

	const mergedVars = {
		...colorVars,
	};

	applyVars(mergedVars, element);
}
