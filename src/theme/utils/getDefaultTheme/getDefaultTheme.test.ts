import { getDefaultTheme } from "../getDefaultTheme";
import { DEFAULT_THEME } from "@/theme/defaults";

describe("getDefaultTheme", () => {
	it("returns DEFAULT_THEME with overridden mode", () => {
		expect(getDefaultTheme("light")).toEqual({
			...DEFAULT_THEME,
			mode: "light",
		});
	});
});
