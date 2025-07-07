import { convertToHexColor } from "./convertToHexColor";

describe("convertToHexColor", () => {
	it("converts a valid short hex to normalized hex", () => {
		expect(convertToHexColor("#abc")).toBe("#aabbcc");
	});

	it("returns the same hex if it's already valid", () => {
		expect(convertToHexColor("#123456")).toBe("#123456");
	});

	it("converts a valid oklch color to hex", () => {
		const hex = convertToHexColor("oklch(0.7 0.1 30)");
		expect(hex).toMatch(/^#[0-9a-f]{6}$/);
	});

	it("converts a named color to hex", () => {
		expect(convertToHexColor("red")).toBe("#ff0000");
		expect(convertToHexColor("blue")).toBe("#0000ff");
	});

	it("converts rgb/rgba/hsl/hsla to hex", () => {
		expect(convertToHexColor("rgb(255, 0, 0)")).toBe("#ff0000");
		expect(convertToHexColor("rgba(0, 255, 0, 1)")).toBe("#00ff00");
		expect(convertToHexColor("hsl(240, 100%, 50%)")).toBe("#0000ff");
		expect(convertToHexColor("hsla(240, 100%, 50%, 0.5)")).toBe("#0000ff");
	});

	it("returns #000000 for undefined input", () => {
		expect(convertToHexColor(undefined)).toBe("#000000");
	});

	it("returns #000000 for empty string", () => {
		expect(convertToHexColor("")).toBe("#000000");
	});

	it("returns #000000 for invalid color strings", () => {
		expect(convertToHexColor("not-a-color")).toBe("#000000");
		expect(convertToHexColor("rgb(300, 300, 300)")).toBe("#ffffff");
	});
});
