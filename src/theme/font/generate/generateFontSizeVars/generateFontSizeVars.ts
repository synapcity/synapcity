import { fontScaleFactors } from "../../constants";
import type { FontSizeToken } from "../../types";

export function generateFontSizeVars(fontSize: FontSizeToken) {
	const scale = fontScaleFactors[fontSize];
	const result: Record<string, string> = {};

	Object.entries(fontScaleFactors).forEach(([key, base]) => {
		const computedKey = key === "md" ? "base" : key;
		const min = (base * scale * 0.875).toFixed(4) ?? scale;
		const max = (base * scale * 1.125).toFixed(4) ?? scale;
		const mid = (base * scale).toFixed(4) ?? base;

		result[
			`--text-${computedKey}`
		] = `clamp(${min}rem, ${mid}rem + 0.5vw, ${max}rem)`;
	});
	return result;
}
