jest.mock("@/theme/generateCss", () => {
	const original = jest.requireActual("@/theme/generateCss");
	return {
		...original,
		generateColorVars: jest.fn(() => ({
			"--primary-50": "#fafafa",
			"--primary-100": "#f5f5f5",
		})),
	};
});

jest.mock("../applyVars", () => ({
	applyVars: jest.fn(),
}));

import { applyGlobalColorVars, applyScopedColorVars } from "./applyColorVars";
import { generateColorVars } from "@/theme/generateCss";
import { applyVars } from "../applyVars";
import type { SemanticColor } from "@/theme/types";

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
			background: "#111",
			foreground: "#eee",
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

	it("calls applyVars with merged vars and document.body (light)", () => {
		const expected = {
			"--primary-50": "#fafafa",
			"--primary-100": "#f5f5f5",
			"--background": mockColor.light.background,
			"--foreground": mockColor.light.foreground,
		};

		applyGlobalColorVars(mockColor, "light", "primary");

		expect(applyVars).toHaveBeenCalledWith(expected, document.body);
	});

	it("calls applyVars with merged vars and document.body (dark)", () => {
		const expected = {
			"--primary-50": "#fafafa",
			"--primary-100": "#f5f5f5",
			"--background": mockColor.dark.background,
			"--foreground": mockColor.dark.foreground,
		};

		applyGlobalColorVars(mockColor, "dark", "primary");

		expect(applyVars).toHaveBeenCalledWith(expected, document.body);
	});
});

describe("applyScopedColorVars", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("calls generateColorVars and applyVars with correct arguments", () => {
		const mockElement = document.createElement("div");

		const mockColor: SemanticColor = {
			base: "#ff0000",
			light: {
				background: "#fff",
				foreground: "#000",
				scale: {
					"50": "#ff0000",
					"100": "#ff1111",
					"200": "#ff2222",
					"300": "#ff3333",
					"400": "#ff4444",
					"500": "#ff5555",
					"600": "#ff6666",
					"700": "#ff7777",
					"800": "#ff8888",
					"900": "#ff9999",
					"950": "#ffaaaa",
				},
			},
			dark: {
				background: "#000",
				foreground: "#fff",
				scale: {
					"50": "#aa0000",
					"100": "#bb1111",
					"200": "#cc2222",
					"300": "#dd3333",
					"400": "#ee4444",
					"500": "#ff5555",
					"600": "#ff6666",
					"700": "#ff7777",
					"800": "#ff8888",
					"900": "#ff9999",
					"950": "#ffaaaa",
				},
			},
		};

		const expected = {
			"--primary-50": "#fafafa",
			"--primary-100": "#f5f5f5",
			"--background": mockColor.light.background,
			"--foreground": mockColor.light.foreground,
		};

		applyScopedColorVars(mockColor, "light", "primary", mockElement);

		expect(generateColorVars).toHaveBeenCalledWith(
			mockColor,
			"light",
			"primary"
		);
		expect(applyVars).toHaveBeenCalledWith(expected, mockElement);
	});
});
