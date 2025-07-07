import { getFontSizeValue } from "../getFontSizeValue";

describe("getFontSizeValue", () => {
	it("returns expected rem value for valid tokens", () => {
		expect(getFontSizeValue("xs")).toBe("0.75rem");
		expect(getFontSizeValue("sm")).toBe("0.875rem");
		expect(getFontSizeValue("md")).toBe("1rem");
		expect(getFontSizeValue("lg")).toBe("1.125rem");
		expect(getFontSizeValue("xl")).toBe("1.25rem");
		expect(getFontSizeValue("2xl")).toBe("1.5rem");
		expect(getFontSizeValue("3xl")).toBe("1.875rem");
		expect(getFontSizeValue("4xl")).toBe("2.125rem");
		expect(getFontSizeValue("5xl")).toBe("2.5rem");
		expect(getFontSizeValue("6xl")).toBe("2.75rem");
	});

	it("falls back to 1rem for invalid tokens", () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect(getFontSizeValue("not-a-token" as any)).toBe("1rem");
	});
});
