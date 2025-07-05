import { applyGlobalModeClass } from "@/theme/mode/apply";

describe("applyGlobalModeClass", () => {
	it("adds the mode class to document.documentElement", () => {
		document.documentElement.classList.add("dark");
		applyGlobalModeClass("light");

		expect(document.documentElement.classList.contains("dark")).toBe(false);
		expect(document.documentElement.classList.contains("light")).toBe(true);
	});
});
