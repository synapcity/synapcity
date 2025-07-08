import { formatHex, parse } from "culori";

/**
 * Converts oklch(...) or any supported color string to hex.
 * Falls back to #000000 if invalid.
 */
export function convertToHexColor(color: string | undefined): string {
	if (!color) return "#000000";

	const parsed = parse(color);
	if (!parsed) return "#000000";

	return formatHex(parsed);
}
