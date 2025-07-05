import { updateGlobalTheme } from "../updateGlobalTheme";
import { useThemeStore } from "@/stores";
import { applyColor, generateColor } from "@/theme/colors";
import { generateSemanticColor } from "@/theme/colors/generate";
import { getContrastingColor } from "@/theme/colors/utils";
import { applyFont, FontSizeToken } from "@/theme/font";
import { applyModeClass } from "@/theme/mode";
import { ThemeMode } from "@/theme/types";

jest.mock("@/stores", () => ({
	useThemeStore: {
		getState: jest.fn(),
	},
}));

jest.mock("@/theme/colors", () => ({
	applyColor: {
		applyGlobalColorVars: jest.fn(),
	},
}));

jest.mock("@/theme/font", () => ({
	applyFont: {
		applyGlobalFontVars: jest.fn(),
	},
}));

jest.mock("@/theme/mode", () => ({
	applyModeClass: {
		applyGlobalModeClass: jest.fn(),
	},
}));

describe("updateGlobalTheme", () => {
	it("sets and applies global theme", () => {
		const setGlobalPreferences = jest.fn();
		const primaryColor = generateSemanticColor("12345");
		const primary = { ...primaryColor };
		const accentColor = generateSemanticColor("#654321");
		const accent = { ...accentColor };
		const preferences = {
			primary,
			accent,
			fontSize: "md" as FontSizeToken,
			fontFamilyBody: "Inter",
			fontFamilyHeading: "Grotesk",
			mode: "dark" as ThemeMode,
		};

		(useThemeStore.getState as jest.Mock)
			.mockReturnValueOnce({
				setGlobalPreferences,
			})
			.mockReturnValueOnce({
				globalPreferences: preferences,
			});

		updateGlobalTheme(preferences);

		expect(setGlobalPreferences).toHaveBeenCalledWith(preferences);
		expect(
			require("@/theme/colors").applyColor.applyGlobalColorVars
		).toHaveBeenCalledTimes(2);
		expect(
			require("@/theme/font").applyFont.applyGlobalFontVars
		).toHaveBeenCalledTimes(3);
		expect(
			require("@/theme/mode").applyModeClass.applyGlobalModeClass
		).toHaveBeenCalledWith("dark");
	});
});
