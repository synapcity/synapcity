import { resetTheme } from "./resetTheme";
import { getDefaultTheme } from "../getDefaultTheme";
import { updateGlobalTheme, updateScopedTheme } from "../updateTheme";
import type { EntityType } from "@/theme/types/entity";

jest.mock("../updateTheme", () => ({
	updateGlobalTheme: jest.fn(),
	updateScopedTheme: jest.fn(),
}));

jest.mock("../getDefaultTheme", () => ({
	getDefaultTheme: jest.fn(() => ({
		primary: "p",
		accent: "a",
		mode: "dark",
		fontSize: "md",
		fontFamilyBody: "Inter",
		fontFamilyHeading: "Grotesk",
		inheritsFromGlobalTheme: true,
		language: "en",
	})),
}));

const mockSetPreferences = jest.fn();
const mockGetPreferences = jest.fn();
const mockSetGlobalPreferences = jest.fn();

jest.mock("@/stores", () => ({
	useThemeStore: {
		getState: () => ({
			setPreferences: mockSetPreferences,
			setGlobalPreferences: mockSetGlobalPreferences,
			getPreferences: mockGetPreferences,
			globalPreferences: {
				mode: "dark",
			},
		}),
	},
}));

describe("resetTheme", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("calls updateGlobalTheme with default theme when no scope/id", () => {
		resetTheme();

		expect(getDefaultTheme).toHaveBeenCalledWith("dark");
		expect(updateGlobalTheme).toHaveBeenCalledWith(
			expect.objectContaining({
				mode: "dark",
			}),
			true
		);
	});

	it("calls updateScopedTheme with current preferences and default theme", () => {
		const mockElement = document.createElement("div");
		const scope: EntityType = "note";
		const id = "abc123";

		mockGetPreferences.mockReturnValue({
			preferences: {
				primary: "x",
				accent: "y",
				mode: "light",
				fontSize: "sm",
				fontFamilyBody: "Body",
				fontFamilyHeading: "Heading",
				inheritsFromGlobalTheme: false,
			},
		});

		resetTheme({ scope, id, element: mockElement });

		expect(getDefaultTheme).toHaveBeenCalledWith("dark");

		expect(updateScopedTheme).toHaveBeenCalledWith(
			scope,
			id,
			expect.objectContaining({ fontSize: "sm" }),
			expect.objectContaining({ mode: "dark" }),
			mockElement
		);
	});

	it("uses empty object as fallback when scoped preferences are undefined", () => {
		const mockElement = document.createElement("div");
		const scope: EntityType = "note";
		const id = "no-prefs";

		mockGetPreferences.mockReturnValue(undefined);

		resetTheme({ scope, id, element: mockElement });

		expect(updateScopedTheme).toHaveBeenCalledWith(
			scope,
			id,
			{},
			expect.any(Object),
			mockElement
		);
	});
});
