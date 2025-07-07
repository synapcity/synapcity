import type { FontSizeToken } from "../../types";
import { generateFontSizeVars } from "../../generate";
import { applyVars } from "../../../utils/applyVars/applyVars";

/**
 * Applies font-related CSS variables to a scoped element.
 * - `postfix = size` → expects `size`
 * - `postfix = body` or `heading` → expects `fontFamily`
 */
export function applyGlobalFontVars({
	postfix,
	size,
	fontFamily,
}: {
	postfix: "size" | "body" | "heading";
	size?: FontSizeToken;
	fontFamily?: string;
}) {
	let vars: Record<string, string> = {};
	const element = document.body;

	if (postfix === "size" && size) {
		vars = generateFontSizeVars(size);
	} else if ((postfix === "body" || postfix === "heading") && fontFamily) {
		vars = { [`--font-${postfix}`]: fontFamily };
	}

	if (Object.keys(vars).length > 0) {
		applyVars(vars, element);
	}
}
