jest.mock("@/theme/applyCss", () => ({
	applyScopedColorVars: jest.fn(),
	applyScopedFontVars: jest.fn(),
	applyScopedModeVars: jest.fn(),
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

import { updateScopedTheme } from "../updateScopedTheme";
import {
	applyScopedColorVars,
	applyScopedFontVars,
	applyScopedModeVars,
} from "@/theme/applyCss";

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
