import { generateColorVars } from "@/theme/generateCss";
import type { ColorShade, SemanticColor } from "@/theme/types";
import { COLOR_SHADE_KEYS as keys } from "@/theme/constants";

const lightScale = Object.fromEntries(keys.map((k) => [k, `#${k}`])) as Record<
	ColorShade,
	string
>;

const darkScale = Object.fromEntries(
	keys.map((k) => [k, `#dark-${k}`])
) as Record<ColorShade, string>;

const mockColor: SemanticColor = {
	base: "#ff0000",
	light: {
		background: "#fff",
		foreground: "#000",
		scale: lightScale,
	},
	dark: {
		background: "#000",
		foreground: "#fff",
		scale: darkScale,
	},
};

describe("generateColorVars", () => {
	it("returns correct vars for light mode", () => {
		const result = generateColorVars(mockColor, "light", "primary");
		expect(result["--primary-50"]).toBe("#50");
		expect(result["--primary-foreground"]).toBe(mockColor.light.scale[800]);
		expect(result["--primary-background"]).toBe(mockColor.light.scale[200]);
	});

	it("returns correct vars for dark mode", () => {
		const result = generateColorVars(mockColor, "dark", "accent");
		expect(result["--accent-50"]).toBe("#dark-50");
		expect(result["--accent-foreground"]).toBe(mockColor.dark.scale[800]);
		expect(result["--accent-background"]).toBe(mockColor.dark.scale[200]);
	});
});
