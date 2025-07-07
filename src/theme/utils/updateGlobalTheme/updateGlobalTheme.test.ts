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

import { updateGlobalTheme } from "../updateGlobalTheme";
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
