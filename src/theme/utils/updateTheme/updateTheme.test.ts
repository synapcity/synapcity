import { defaultPrimary, defaultAccent, DEFAULT } from "@/theme/defaults";

jest.mock("@/theme/applyCss", () => ({
	applyScopedColorVars: jest.fn(),
	applyScopedFontVars: jest.fn(),
	applyScopedModeVars: jest.fn(),
	applyGlobalColorVars: jest.fn(),
	applyGlobalFontVars: jest.fn(),
	applyGlobalModeVars: jest.fn(),
}));

const mockSetPreferences = jest.fn();
const mockSetGlobalPreferences = jest.fn();
const mockGetPreferences = jest.fn();
const mockResetScopedPreferences = jest.fn();

jest.mock("@/stores", () => ({
	useThemeStore: {
		getState: () => ({
			setPreferences: mockSetPreferences,
			setGlobalPreferences: mockSetGlobalPreferences,
			getPreferences: mockGetPreferences,
			resetScopedPreferences: mockResetScopedPreferences,
			globalPreferences: {
				primary: {
					...defaultPrimary,
				},
				accent: {
					...defaultAccent,
				},
				mode: "light",
				fontSize: "sm",
				fontFamilyBody: "Inter",
				fontFamilyHeading: "Grotesk",
				inheritsFromGlobalTheme: true,
				language: "en",
			},
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

import { defaultFontValues } from "@/theme/defaults";
import { updateScopedTheme, updateGlobalTheme } from "./updateTheme";
import {
	applyScopedColorVars as mockScopedColor,
	applyScopedFontVars as mockScopedFont,
	applyScopedModeVars as mockScopedMode,
	applyGlobalColorVars as mockGlobalColor,
	applyGlobalFontVars as mockGlobalFont,
	applyGlobalModeVars as mockGlobalMode,
} from "@/theme/applyCss";
import { FontSizeToken, ThemeMode } from "@/theme/types";

describe("updateGlobalTheme", () => {
	it("sets and applies global theme updates", () => {
		const updates = {
			fontSize: "md" as FontSizeToken,
		};

		updateGlobalTheme(updates);

		expect(mockSetGlobalPreferences).toHaveBeenCalledWith(
			expect.objectContaining({
				fontSize: "md",
			})
		);

		expect(mockGlobalColor).toHaveBeenCalledWith(
			defaultPrimary,
			"light",
			"primary"
		);
		expect(mockGlobalColor).toHaveBeenCalledWith(
			defaultAccent,
			"light",
			"accent"
		);

		expect(mockGlobalFont).toHaveBeenCalledWith({
			postfix: "size",
			size: "md",
		});
		expect(mockGlobalFont).toHaveBeenCalledWith({
			postfix: "body",
			fontFamily: defaultFontValues.fontFamilyBody,
		});
		expect(mockGlobalFont).toHaveBeenCalledWith({
			postfix: "heading",
			fontFamily: defaultFontValues.fontFamilyHeading,
		});

		expect(mockGlobalMode).toHaveBeenCalledWith("light");
	});
	it("applies full theme when overrideAll is true", () => {
		const updates = {
			fontFamilyBody: "NewFont",
			mode: "dark" as ThemeMode,
		};

		updateGlobalTheme(updates, true);

		expect(mockSetGlobalPreferences).toHaveBeenCalledWith(
			expect.objectContaining({
				...DEFAULT.THEME,
				...updates,
			})
		);

		expect(mockGlobalColor).toHaveBeenCalledWith(
			expect.anything(),
			"dark",
			"primary"
		);

		expect(mockGlobalFont).toHaveBeenCalledWith({
			postfix: "body",
			fontFamily: "NewFont",
		});
		expect(mockGlobalMode).toHaveBeenCalledWith("dark");
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
		const preferences = mockGetPreferences().preferences;

		updateScopedTheme("note", "abc", preferences, { fontSize: "sm" }, el);

		expect(mockSetPreferences).toHaveBeenCalledWith("note", "abc", {
			fontSize: "sm",
		});

		expect(mockScopedColor).toHaveBeenCalledTimes(2);
		expect(mockScopedFont).toHaveBeenCalledTimes(3);
		expect(mockScopedMode).toHaveBeenCalledWith("light", el);
	});
});
