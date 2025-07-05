import { generateColorVars } from "@/theme/colors/generate";
import type { ColorShade, SemanticColor } from "@/theme/colors/types";

const keys = [
	"50",
	"100",
	"200",
	"300",
	"400",
	"500",
	"600",
	"700",
	"800",
	"900",
	"950",
] as const;

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
		expect(result["--primary-foreground"]).toBe("#000");
		expect(result["--primary-background"]).toBe("#fff");
	});

	it("returns correct vars for dark mode", () => {
		const result = generateColorVars(mockColor, "dark", "accent");
		expect(result["--accent-50"]).toBe("#dark-50");
		expect(result["--accent-foreground"]).toBe("#fff");
		expect(result["--accent-background"]).toBe("#000");
	});
});
