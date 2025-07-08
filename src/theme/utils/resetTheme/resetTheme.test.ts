jest.mock("@/stores", () => ({
	useThemeStore: {
		getState: jest.fn(),
	},
}));

jest.mock("../getDefaultTheme", () => ({
	getDefaultTheme: jest.fn(),
}));

jest.mock("./updateTheme", () => ({
	updateGlobalTheme: jest.fn(),
	updateScopedTheme: jest.fn(),
}));

import { resetGlobalTheme, resetScopedTheme } from "./resetTheme";
import { updateGlobalTheme, updateScopedTheme } from "../updateTheme";
import { useThemeStore } from "@/stores";
import { getDefaultTheme } from "../getDefaultTheme";
import {
	applyGlobalColorVars,
	applyGlobalFontVars,
	applyGlobalModeVars,
} from "@/theme/applyCss";
import {
	DEFAULT,
	defaultAccent,
	defaultFontValues,
	defaultPrimary,
} from "@/theme/defaults";

describe("resetGlobalTheme", () => {
	it("calls updateGlobalTheme with DEFAULT_THEME", () => {
		resetGlobalTheme();
		expect(updateGlobalTheme).toHaveBeenCalledWith(DEFAULT.THEME);
	});
});

describe("resetScopedTheme", () => {
	it("resets scoped theme with global mode", () => {
		(useThemeStore.getState as jest.Mock).mockReturnValue({
			globalPreferences: { mode: "light" },
		});
		const mockTheme = { foo: "bar" };
		(getDefaultTheme as jest.Mock).mockReturnValue(mockTheme);

		const el = document.createElement("div");

		resetScopedTheme("note", "123", el);

		expect(getDefaultTheme).toHaveBeenCalledWith("light");
		expect(updateScopedTheme).toHaveBeenCalledWith(
			"note",
			"123",
			mockTheme,
			el
		);
	});
});
const mockSetGlobalPreferences = jest.fn();

jest.mock("@/theme/applyCss", () => ({
	applyGlobalColorVars: jest.fn(),
	applyGlobalFontVars: jest.fn(),
	applyGlobalModeVars: jest.fn(),
}));

jest.mock("@/stores", () => ({
	useThemeStore: {
		getState: () => ({
			setGlobalPreferences: mockSetGlobalPreferences,
			globalPreferences: {
				primary: "oldPrimary",
				accent: "oldAccent",
				fontSize: "sm",
				fontFamilyBody: "OldBody",
				fontFamilyHeading: "OldHeading",
				mode: "dark",
			},
		}),
	},
}));

describe("updateGlobalTheme", () => {
	it("sets and applies global theme updates", () => {
		const preferences = {
			...DEFAULT.THEME,
		};

		updateGlobalTheme(preferences);

		expect(mockSetGlobalPreferences).toHaveBeenCalledWith(preferences);

		expect(applyGlobalColorVars).toHaveBeenCalledWith(
			defaultPrimary,
			"dark",
			"primary"
		);
		expect(applyGlobalColorVars).toHaveBeenCalledWith(
			defaultAccent,
			"dark",
			"accent"
		);

		expect(applyGlobalFontVars).toHaveBeenCalledWith({
			postfix: "size",
			size: "md",
		});
		expect(applyGlobalFontVars).toHaveBeenCalledWith({
			postfix: "body",
			fontFamily: defaultFontValues.fontFamilyBody,
		});
		expect(applyGlobalFontVars).toHaveBeenCalledWith({
			postfix: "heading",
			fontFamily: defaultFontValues.fontFamilyHeading,
		});

		expect(applyGlobalModeVars).toHaveBeenCalledWith(DEFAULT.MODE);
	});
});
