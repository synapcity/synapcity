import type { SemanticColor } from "./types";

export const DEFAULT_PRIMARY_BASE = "#78716c";
export const DEFAULT_ACCENT_BASE = "22d3ee";

export const defaultPrimary: SemanticColor = {
	base: "#78716c",
	light: {
		foreground: "#1c1917",
		background: "#f5f5f4",
		scale: {
			"50": "#fafaf9",
			"100": "#f5f5f4",
			"200": "#e7e5e4",
			"300": "#d6d3d1",
			"400": "#a8a29e",
			"500": "#78716c",
			"600": "#57534e",
			"700": "#44403c",
			"800": "#292524",
			"900": "#1c1917",
			"950": "#0c0a09",
		},
	},
	dark: {
		foreground: "#fafaf9",
		background: "#1c1917",
		scale: {
			"50": "#0c0a09",
			"100": "#1c1917",
			"200": "#292524",
			"300": "#44403c",
			"400": "#57534e",
			"500": "#78716c",
			"600": "#a8a29e",
			"700": "#d6d3d1",
			"800": "#e7e5e4",
			"900": "#f5f5f4",
			"950": "#fafaf9",
		},
	},
};

export const defaultAccent: SemanticColor = {
	base: "#22d3ee",
	light: {
		foreground: "#164e63",
		background: "#ecfeff",
		scale: {
			"50": "#ecfeff",
			"100": "#cffafe",
			"200": "#a5f3fc",
			"300": "#67e8f9",
			"400": "#22d3ee",
			"500": "#06b6d4",
			"600": "#0891b2",
			"700": "#0e7490",
			"800": "#155e75",
			"900": "#164e63",
			"950": "#083344",
		},
	},
	dark: {
		foreground: "#ecfeff",
		background: "#164e63",
		scale: {
			"50": "#083344",
			"100": "#164e63",
			"200": "#155e75",
			"300": "#0e7490",
			"400": "#0891b2",
			"500": "#06b6d4",
			"600": "#22d3ee",
			"700": "#67e8f9",
			"800": "#a5f3fc",
			"900": "#cffafe",
			"950": "#ecfeff",
		},
	},
};
