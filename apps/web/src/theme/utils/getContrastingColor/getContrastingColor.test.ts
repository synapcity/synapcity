import { getContrastingColor } from "./getContrastingColor";

describe("getContrastingColor", () => {
  it("returns white for dark colors", () => {
    expect(getContrastingColor("#000000")).toBe("#FFFFFF");
    expect(getContrastingColor("#111111")).toBe("#FFFFFF");
    expect(getContrastingColor("#333")).toBe("#FFFFFF");
    expect(getContrastingColor("navy")).toBe("#FFFFFF");
  });

  it("returns black for light colors", () => {
    expect(getContrastingColor("#FFFFFF")).toBe("#000000");
    expect(getContrastingColor("#eeeeee")).toBe("#000000");
    expect(getContrastingColor("ivory")).toBe("#000000");
    expect(getContrastingColor("#ccc")).toBe("#000000");
  });

  it("handles mid-tones accurately", () => {
    expect(getContrastingColor("#888888")).toBe("#000000"); // ~0.53 luminance
    expect(getContrastingColor("#444444")).toBe("#FFFFFF"); // ~0.27 luminance
  });

  it("supports shorthand hex", () => {
    expect(getContrastingColor("#abc")).toBe("#000000");
    expect(getContrastingColor("#123")).toBe("#FFFFFF");
  });

  it("returns a fallback for invalid hex (graceful failure)", () => {
    // tinycolor returns black if invalid; this matches your logic
    expect(getContrastingColor("invalid")).toBe("#FFFFFF");
  });
});
