import { resetGlobalTheme } from "../resetGlobalTheme";
import { updateGlobalTheme } from "../updateGlobalTheme/updateGlobalTheme";
import { DEFAULT_THEME } from "@/theme/defaults";

jest.mock("../updateGlobalTheme/updateGlobalTheme", () => ({
	updateGlobalTheme: jest.fn(),
}));

describe("resetGlobalTheme", () => {
	it("calls updateGlobalTheme with DEFAULT_THEME", () => {
		resetGlobalTheme();
		expect(updateGlobalTheme).toHaveBeenCalledWith(DEFAULT_THEME);
	});
});
