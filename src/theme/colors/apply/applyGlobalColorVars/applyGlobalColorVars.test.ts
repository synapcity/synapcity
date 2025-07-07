import { applyGlobalColorVars } from "@/theme/colors/apply/applyGlobalColorVars";
import { generateColorVars } from "@/theme/colors/generate";
import { SemanticColor } from "@/theme/colors/types";

jest.mock("@/theme/colors/generate", () => ({
	generateColorVars: jest.fn(() => ({
		"--primary-50": "#fafafa",
		"--primary-100": "#f5f5f5",
		"--primary-foreground": "#111",
		"--primary-background": "#fff",
	})),
}));

jest.mock("@/theme/utils/applyVars", () => ({
	applyVars: jest.fn(),
}));

import { applyVars } from "@/theme/utils/applyVars";

describe("applyGlobalColorVars", () => {
	const mockColor: SemanticColor = {
		base: "#ffffff",
		light: {
			background: "#fff",
			foreground: "#000",
			scale: {
				"50": "#fafafa",
				"100": "#f5f5f5",
				"200": "#e5e5e5",
				"300": "#d4d4d4",
				"400": "#a3a3a3",
				"500": "#737373",
				"600": "#525252",
				"700": "#404040",
				"800": "#262626",
				"900": "#171717",
				"950": "#0a0a0a",
			},
		},
		dark: {
			background: "#000",
			foreground: "#fff",
			scale: {
				"50": "#0a0a0a",
				"100": "#171717",
				"200": "#262626",
				"300": "#404040",
				"400": "#525252",
				"500": "#737373",
				"600": "#a3a3a3",
				"700": "#d4d4d4",
				"800": "#e5e5e5",
				"900": "#f5f5f5",
				"950": "#fafafa",
			},
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("calls generateColorVars with correct arguments", () => {
		applyGlobalColorVars(mockColor, "light", "primary");
		expect(generateColorVars).toHaveBeenCalledWith(
			mockColor,
			"light",
			"primary"
		);
	});

	it("calls applyVars with correct vars and document.documentElement", () => {
		const mockRoot = document.body;
		applyGlobalColorVars(mockColor, "light", "primary");
		expect(applyVars).toHaveBeenCalledWith(expect.any(Object), mockRoot);
	});
});
