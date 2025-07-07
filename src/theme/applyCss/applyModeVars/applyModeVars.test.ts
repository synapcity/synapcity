import { applyGlobalModeVars, applyScopedModeVars } from "./applyModeVars";

describe("applyGlobalModeVars", () => {
	it("adds the mode class to document.documentElement", () => {
		document.body.classList.add("dark");
		applyGlobalModeVars("light");

		expect(document.body.classList.contains("dark")).toBe(false);
		expect(document.body.classList.contains("light")).toBe(true);
	});
});

describe("applyScopedModeVars", () => {
	it("adds the mode class to the given element", () => {
		const el = document.createElement("div");
		el.classList.add("dark");

		applyScopedModeVars("light", el);

		expect(el.classList.contains("dark")).toBe(false);
		expect(el.classList.contains("light")).toBe(true);
	});
});
