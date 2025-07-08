import { COLOR_SHADE_KEYS } from "@/theme/constants";
import { generateSemanticColor } from "./generateSemanticColor";

describe("generateSemanticColor", () => {
	it("should generate a SemanticColor with matching base", () => {
		const base = "#22d3ee";
		const semantic = generateSemanticColor(base);
		expect(semantic.base).toBe(base);
	});

	it("should generate distinct light and dark scales", () => {
		const base = "#f97316";
		const semantic = generateSemanticColor(base);

		const lightScale = semantic.light.scale;
		const darkScale = semantic.dark.scale;

		expect(lightScale[50]).toEqual(darkScale[950]);
		expect(darkScale[50]).toEqual(lightScale[950]);

		expect(new Set(Object.keys(lightScale))).toEqual(new Set(COLOR_SHADE_KEYS));
		expect(new Set(Object.keys(darkScale))).toEqual(new Set(COLOR_SHADE_KEYS));
	});

	it("should assign correct foreground/background values", () => {
		const semantic = generateSemanticColor("#22d3ee");

		expect(semantic.light.background).toBe(semantic.light.scale["100"]);
		expect(semantic.light.foreground).toBe(semantic.light.scale["900"]);
		expect(semantic.dark.background).toBe(semantic.light.scale["950"]);
		expect(semantic.dark.foreground).toBe(semantic.light.scale["50"]);
	});
});
