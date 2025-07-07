import { applyGlobalModeClass } from "@/theme/mode/apply";

describe("applyGlobalModeClass", () => {
	it("adds the mode class to document.documentElement", () => {
		document.documentElement.classList.add("dark");
		applyGlobalModeClass("light");

		expect(document.body.classList.contains("dark")).toBe(false);
		expect(document.body.classList.contains("light")).toBe(true);
	});
});
