import { setGlobalMode } from "../setGlobalMode";
import { useThemeStore } from "@/stores";

jest.mock("@/stores", () => ({
	useThemeStore: {
		getState: jest.fn(),
	},
}));

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
