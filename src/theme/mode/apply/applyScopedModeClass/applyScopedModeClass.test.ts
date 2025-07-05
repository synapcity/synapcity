import { applyScopedModeClass } from "./applyScopedModeClass";

describe("applyScopedModeClass", () => {
	it("adds the mode class to the given element", () => {
		const el = document.createElement("div");
		el.classList.add("dark");

		applyScopedModeClass("light", el);

		expect(el.classList.contains("dark")).toBe(false);
		expect(el.classList.contains("light")).toBe(true);
	});
});
