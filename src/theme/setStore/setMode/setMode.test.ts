jest.mock("@/stores", () => ({
	useThemeStore: {
		getState: jest.fn(),
	},
}));

import { setGlobalMode, setScopedMode } from "./setMode";
import { useThemeStore } from "@/stores";

describe("setGlobalMode", () => {
	it("updates global mode", () => {
		const setGlobalPreferences = jest.fn();
		(useThemeStore.getState as jest.Mock).mockReturnValue({
			setGlobalPreferences,
		});

		setGlobalMode("dark");
		expect(setGlobalPreferences).toHaveBeenCalledWith({ mode: "dark" });
	});
});

jest.mock("@/stores", () => ({
	useThemeStore: {
		getState: jest.fn(),
	},
}));

describe("setScopedMode", () => {
	it("updates scoped mode", () => {
		const setPreferences = jest.fn();
		(useThemeStore.getState as jest.Mock).mockReturnValue({ setPreferences });

		setScopedMode("note", "id-1", "light");
		expect(setPreferences).toHaveBeenCalledWith("note", "id-1", {
			mode: "light",
		});
	});
});
