import { resetScopedTheme } from "../resetScopedTheme";
import { useThemeStore } from "@/stores";
import { updateScopedTheme } from "../updateScopedTheme";
import { getDefaultTheme } from "../getDefaultTheme";

jest.mock("@/stores", () => ({
	useThemeStore: {
		getState: jest.fn(),
	},
}));

jest.mock("../updateScopedTheme", () => ({
	updateScopedTheme: jest.fn(),
}));

jest.mock("../getDefaultTheme", () => ({
	getDefaultTheme: jest.fn(),
}));

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
