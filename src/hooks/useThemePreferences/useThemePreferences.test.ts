jest.mock("@/stores/themeStore/useThemeStore", () => ({
	useThemeStore: jest.fn(),
}));

import { renderHook, act } from "@testing-library/react";
import { useThemePreferences } from "./useThemePreferences";
import { useThemeStore } from "@/stores/themeStore/useThemeStore";
import { DEFAULT_THEME } from "@/theme/defaults";
import type { EntityType } from "@/types/entity";
import type { ThemePreferences } from "@/theme/types";

const mockUseThemeStore = useThemeStore as unknown as jest.Mock;

describe("useThemePreferences", () => {
	const mockSetGlobal = jest.fn();
	const mockSetScoped = jest.fn();
	const mockGetPreferences = jest.fn();

	const scopedPrefs: Record<EntityType, Record<string, ThemePreferences>> = {
		note: {
			abc: {
				...DEFAULT_THEME,
				fontSize: "xl",
				inheritsFromGlobalTheme: false,
			},
		},
		dashboard: {},
		widget: {},
	};

	beforeEach(() => {
		jest.clearAllMocks();

		mockUseThemeStore.mockReturnValue({
			globalPreferences: DEFAULT_THEME,
			scopedPreferences: scopedPrefs,
			getPreferences: mockGetPreferences,
			setGlobalPreferences: mockSetGlobal,
			setPreferences: mockSetScoped,
		});
	});

	it("returns global preferences when entityType is 'global'", () => {
		const { result } = renderHook(() => useThemePreferences("global"));

		expect(result.current.preferences).toEqual(DEFAULT_THEME);
		expect(result.current.isScoped).toBe(false);
		expect(result.current.isInherited).toBe(false);
	});

	it("returns scoped preferences from store", () => {
		const mockPref = {
			...DEFAULT_THEME,
			fontSize: "xl",
			inheritsFromGlobalTheme: false,
		};
		mockGetPreferences.mockReturnValue(mockPref);

		const { result } = renderHook(() => useThemePreferences("note", "abc"));

		expect(mockGetPreferences).toHaveBeenCalledWith("note", "abc");
		expect(result.current.preferences).toEqual(mockPref);
		expect(result.current.isScoped).toBe(true);
		expect(result.current.isInherited).toBe(false);
	});

	it("returns isInherited as true when scoped prefs inherit", () => {
		mockUseThemeStore.mockReturnValueOnce({
			globalPreferences: DEFAULT_THEME,
			scopedPreferences: {
				note: {
					abc: {
						...DEFAULT_THEME,
						inheritsFromGlobalTheme: true,
					},
				},
				dashboard: {},
				widget: {},
			},
			getPreferences: mockGetPreferences,
			setGlobalPreferences: mockSetGlobal,
			setPreferences: mockSetScoped,
		});

		const { result } = renderHook(() => useThemePreferences("note", "abc"));

		expect(result.current.isInherited).toBe(true);
	});

	it("calls setGlobalPreferences if global", () => {
		const { result } = renderHook(() => useThemePreferences("global"));

		act(() => {
			result.current.setPreferences({ fontSize: "sm" });
		});

		expect(mockSetGlobal).toHaveBeenCalledWith({ fontSize: "sm" });
		expect(mockSetScoped).not.toHaveBeenCalled();
	});

	it("calls setScopedPreferences with merged inheritsFromGlobalTheme if scoped", () => {
		const { result } = renderHook(() => useThemePreferences("note", "abc"));

		act(() => {
			result.current.setPreferences({ fontSize: "lg" });
		});

		expect(mockSetScoped).toHaveBeenCalledWith("note", "abc", {
			fontSize: "lg",
			inheritsFromGlobalTheme: false,
		});
	});

	it("preserves explicitly set inheritsFromGlobalTheme", () => {
		const { result } = renderHook(() => useThemePreferences("note", "abc"));

		act(() => {
			result.current.setPreferences({
				inheritsFromGlobalTheme: true,
				fontSize: "lg",
			});
		});

		expect(mockSetScoped).toHaveBeenCalledWith("note", "abc", {
			fontSize: "lg",
			inheritsFromGlobalTheme: true,
		});
	});
});
