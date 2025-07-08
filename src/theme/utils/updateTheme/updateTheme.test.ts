jest.mock("@/theme/applyCss", () => ({
	applyScopedColorVars: jest.fn(),
	applyScopedFontVars: jest.fn(),
	applyScopedModeVars: jest.fn(),
	applyGlobalColorVars: jest.fn(),
	applyGlobalFontVars: jest.fn(),
	applyGlobalModeVars: jest.fn(),
}));

const mockSetPreferences = jest.fn();
const mockGetPreferences = jest.fn();
const mockResetScopedPreferences = jest.fn();

jest.mock("@/stores", () => ({
	useThemeStore: {
		getState: () => ({
			setPreferences: mockSetPreferences,
			getPreferences: mockGetPreferences,
			resetScopedPreferences: mockResetScopedPreferences,
			scopedPreferences: {
				note: {
					abc: {
						inheritsFromGlobalTheme: false,
					},
				},
			},
		}),
	},
}));

import {
	DEFAULT,
	defaultPrimary,
	defaultAccent,
	defaultFontValues,
} from "@/theme/defaults";
import { updateScopedTheme, updateGlobalTheme } from "./updateTheme";
import {
	applyScopedColorVars,
	applyScopedFontVars,
	applyScopedModeVars,
	applyGlobalColorVars,
	applyGlobalFontVars,
	applyGlobalModeVars,
} from "@/theme/applyCss";

describe("updateGlobalTheme", () => {
	it("sets and applies global theme updates", () => {
		const preferences = {
			...DEFAULT.THEME,
		};

		updateGlobalTheme(preferences);

		expect(mockSetPreferences).toHaveBeenCalledWith(preferences);

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

describe("updateScopedTheme", () => {
	beforeEach(() => {
		jest.clearAllMocks();

		mockGetPreferences.mockReturnValue({
			preferences: {
				primary: "p",
				accent: "a",
				mode: "light",
				fontSize: "sm",
				fontFamilyBody: "body",
				fontFamilyHeading: "heading",
				inheritsFromGlobalTheme: false,
			},
		});
	});

	it("applies scoped theme updates", () => {
		const el = document.createElement("div");

		updateScopedTheme("note", "abc", { fontSize: "sm" }, el);

		expect(mockSetPreferences).toHaveBeenCalledWith("note", "abc", {
			fontSize: "sm",
		});

		expect(applyScopedColorVars).toHaveBeenCalledTimes(2);
		expect(applyScopedFontVars).toHaveBeenCalledTimes(3);
		expect(applyScopedModeVars).toHaveBeenCalledWith("light", el);
	});
});
