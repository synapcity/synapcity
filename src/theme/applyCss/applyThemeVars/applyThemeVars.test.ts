import { applyThemeVars } from "./applyThemeVars";
import { applyScopedFontVars, applyScopedModeVars } from "@/theme/applyCss";
import { applyVars } from "@/theme/applyCss/applyVars";
import type { ThemePreferences } from "@/theme/types";

jest.mock("@/theme/applyCss", () => ({
	applyScopedFontVars: jest.fn(),
	applyScopedModeVars: jest.fn(),
}));

jest.mock("@/theme/applyCss/applyVars", () => ({
	applyVars: jest.fn(),
}));

jest.mock("@/theme/applyCss/applyColorVars", () => ({
	applyColorVars: jest.fn(),
}));

jest.mock("@/theme/generateCss/generateColorVars", () => ({
	generateColorVars: jest.fn((color, mode, type) => ({
		[`--${type}-color`]: `${color.base}-${mode}`,
	})),
}));

describe("applyThemeVars", () => {
	const mockElement = document.createElement("div");

	const mockScale = {
		50: "",
		100: "",
		200: "",
		300: "",
		400: "",
		500: "",
		600: "",
		700: "",
		800: "",
		900: "",
		950: "",
	};

	const preferences: ThemePreferences = {
		mode: "light",
		fontSize: "md",
		fontFamilyBody: "Inter",
		fontFamilyHeading: "Grotesk",
		primary: {
			base: "#111",
			light: { background: "#fff", foreground: "#000", scale: mockScale },
			dark: { background: "#000", foreground: "#fff", scale: mockScale },
		},
		accent: {
			base: "#222",
			light: { background: "#eee", foreground: "#111", scale: mockScale },
			dark: { background: "#111", foreground: "#eee", scale: mockScale },
		},
		inheritsFromGlobalTheme: false,
		language: "en",
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("applies vars using preferences.mode", () => {
		applyThemeVars({ preferences, element: mockElement });

		expect(applyScopedModeVars).toHaveBeenCalledWith("light", mockElement);
		expect(applyVars).toHaveBeenCalledWith(
			expect.objectContaining({ "--primary-color": "#111-light" }),
			mockElement
		);
		expect(applyVars).toHaveBeenCalledWith(
			expect.objectContaining({ "--accent-color": "#222-light" }),
			mockElement
		);
		expect(applyScopedFontVars).toHaveBeenCalledWith({
			element: mockElement,
			postfix: "size",
			size: "md",
		});
		expect(applyScopedFontVars).toHaveBeenCalledWith({
			element: mockElement,
			postfix: "body",
			fontFamily: "Inter",
		});
		expect(applyScopedFontVars).toHaveBeenCalledWith({
			element: mockElement,
			postfix: "heading",
			fontFamily: "Grotesk",
		});
	});

	it("respects modeOverride", () => {
		applyThemeVars({ preferences, element: mockElement, modeOverride: "dark" });

		expect(applyScopedModeVars).toHaveBeenCalledWith("dark", mockElement);
		expect(applyVars).toHaveBeenCalledWith(
			expect.objectContaining({ "--primary-color": "#111-dark" }),
			mockElement
		);
		expect(applyVars).toHaveBeenCalledWith(
			expect.objectContaining({ "--accent-color": "#222-dark" }),
			mockElement
		);
	});
});
