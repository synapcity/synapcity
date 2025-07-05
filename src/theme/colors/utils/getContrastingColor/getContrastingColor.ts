import tinycolor from "tinycolor2";

export function getContrastingColor(hex: string): string {
	const { r, g, b } = tinycolor(hex).toRgb();
	const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
	return luminance < 0.5 ? "#FFFFFF" : "#000000";
}
