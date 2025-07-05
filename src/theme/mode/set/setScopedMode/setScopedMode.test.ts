import { setScopedMode } from "../setScopedMode";
import { useThemeStore } from "@/stores";

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
