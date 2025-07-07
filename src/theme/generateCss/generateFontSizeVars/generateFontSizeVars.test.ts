import { generateFontSizeVars } from "./generateFontSizeVars";
import { fontScaleFactors } from "@/theme/constants";

describe("generateFontSizeVars", () => {
	it("returns font size variables for a given token", () => {
		const result = generateFontSizeVars("md");

		expect(result).toHaveProperty("--text-xs");
		expect(result).toHaveProperty("--text-base");
		expect(result["--text-base"]).toMatch(/^clamp\(/);
	});

	it("generates correct clamp expression for known scale", () => {
		const base = fontScaleFactors["md"];
		const scale = fontScaleFactors["md"];

		const min = (base * scale * 0.875).toFixed(4);
		const mid = (base * scale).toFixed(4);
		const max = (base * scale * 1.125).toFixed(4);

		const expected = `clamp(${min}rem, ${mid}rem + 0.5vw, ${max}rem)`;
		const vars = generateFontSizeVars("md");

		expect(vars["--text-base"]).toBe(expected);
	});
});
