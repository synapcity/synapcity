import type { FontSizeToken } from "@/theme/types";
import { generateFontSizeVars } from "@/theme/generateCss";
import { applyVars } from "@/theme/applyCss";
import { loadGoogleFont } from "@/components/molecules/theme/font/FontFamily/loadGoogleFont";

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
		loadGoogleFont(fontFamily);
		vars = { [`--font-${postfix}`]: fontFamily };
	}

	if (Object.keys(vars).length > 0) {
		applyVars(vars, element);
	}
}
/**
 * Applies font-related CSS variables to a scoped element.
 * - `postfix = size` → expects `size`
 * - `postfix = body` or `heading` → expects `fontFamily`
 */
export function applyScopedFontVars({
	postfix,
	element,
	size,
	fontFamily,
}: {
	postfix: "size" | "body" | "heading";
	element: HTMLElement;
	size?: FontSizeToken;
	fontFamily?: string;
}) {
	let vars: Record<string, string> = {};

	if (postfix === "size" && size) {
		vars = generateFontSizeVars(size);
	} else if ((postfix === "body" || postfix === "heading") && fontFamily) {
		loadGoogleFont(fontFamily);
		vars = { [`--font-${postfix}`]: fontFamily };
	}

	if (Object.keys(vars).length > 0) {
		applyVars(vars, element);
	}
}
