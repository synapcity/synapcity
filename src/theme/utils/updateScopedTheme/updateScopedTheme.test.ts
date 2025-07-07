jest.mock("@/theme/colors/apply");
jest.mock("@/theme/font/apply");
jest.mock("@/theme/mode/apply");

import { updateScopedTheme } from "../updateScopedTheme";
import { useThemeStore } from "@/stores";
import { applyColor } from "@/theme/colors";
import { applyFont } from "@/theme/font";
import { applyModeClass } from "@/theme/mode";

describe("updateScopedTheme", () => {
	it("applies scoped theme updates", () => {
		const element = document.createElement("div");

		updateScopedTheme("note", "abc", { fontSize: "sm" }, element);

		expect(applyColor.applyScopedColorVars).toHaveBeenCalledTimes(2);
		expect(applyFont.applyScopedFontVars).toHaveBeenCalledTimes(3);
		expect(applyModeClass.applyScopedModeClass).toHaveBeenCalledWith(
			"light",
			element
		);
	});

	it("does nothing if inheritsFromGlobalTheme is true", () => {
		const el = document.createElement("div");

		updateScopedTheme("note", "abc", { fontSize: "sm" }, el);

		const theme = useThemeStore.getState().getPreferences("note", "abc");
		const fontSize = theme.preferences.fontSize;
		expect(fontSize).toEqual("md");
	});
});
