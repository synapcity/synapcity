jest.mock("@/theme/colors/generate/generateColorVars", () => ({
	generateColorVars: jest.fn(() => ({ "--primary": "#ff0000" })),
}));
jest.mock("@/theme/utils", () => ({
	applyVars: jest.fn(),
}));

import { applyScopedColorVars } from "./applyScopedColorVars";
import {
	generateColorVars,
	generateSemanticColor,
} from "@/theme/colors/generate";
import { applyVars } from "@/theme/utils";

describe("applyScopedColorVars", () => {
	it("calls generateColorVars and applyVars with correct arguments", () => {
		const mockElement = document.createElement("div");

		const primaryColor = generateSemanticColor("ff0000");

		applyScopedColorVars(primaryColor, "light", "primary", mockElement);

		expect(generateColorVars).toHaveBeenCalledWith(
			primaryColor,
			"light",
			"primary"
		);
		expect(applyVars).toHaveBeenCalledWith(
			{ "--primary": "#ff0000" },
			mockElement
		);
	});
});
