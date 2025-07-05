jest.mock("@/theme/colors/apply");
jest.mock("@/theme/font/apply");
jest.mock("@/theme/mode/apply");

import { updateScopedTheme } from "../updateScopedTheme";
import { useThemeStore } from "@/stores";

describe("updateScopedTheme", () => {
	it("applies scoped theme updates", () => {
		const element = document.createElement("div");

		updateScopedTheme("note", "abc", { fontSize: "sm" }, element);

		expect(
			require("@/theme/colors").applyColor.applyScopedColorVars
		).toHaveBeenCalledTimes(2);
		expect(
			require("@/theme/font").applyFont.applyScopedFontVars
		).toHaveBeenCalledTimes(3);
		expect(
			require("@/theme/mode").applyModeClass.applyScopedModeClass
		).toHaveBeenCalledWith("light", element);
	});

	it("does nothing if inheritsFromGlobalTheme is true", () => {
		const el = document.createElement("div");

		updateScopedTheme("note", "abc", { fontSize: "sm" }, el);

		const theme = useThemeStore.getState().getPreferences("note", "abc");
		const fontSize = theme.fontSize;
		expect(fontSize).toEqual("md");
	});
});
