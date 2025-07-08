import { getDefaultTheme } from "../getDefaultTheme";
import { DEFAULT } from "@/theme/defaults";

describe("getDefaultTheme", () => {
	it("returns DEFAULT_THEME with overridden mode", () => {
		expect(getDefaultTheme("light")).toEqual({
			...DEFAULT.THEME,
			mode: "light",
		});
	});
});
