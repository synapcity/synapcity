jest.mock("colord");

import { generateColorScale } from "./generateColorScale";
import { COLOR_SHADE_KEYS } from "@/theme/constants";

describe("generateColorScale", () => {
  it("should return an object with all 11 expected shades", () => {
    const base = "#f97316";
    const scale = generateColorScale(base);
    expect(new Set(Object.keys(scale).sort())).toEqual(new Set(COLOR_SHADE_KEYS));
  });

  it("should return hex values in the correct format", () => {
    const scale = generateColorScale("#22d3ee");
    for (const value of Object.values(scale)) {
      expect(value).toMatch(/^#([0-9a-fA-F]{6})$/);
    }
  });
});

describe("generateColorScale edge cases", () => {
  it("should fall back to base color if merged[i] is undefined", () => {
    const base = "#abcdef";
    const result = generateColorScale(base);

    let fallbackUsed = false;
    for (let i = 0; i < COLOR_SHADE_KEYS.length; i++) {
      const key = COLOR_SHADE_KEYS[i];
      const value = result[key];
      if (!["#111111", "#222222", "#999999"].includes(value)) {
        expect(value).toBe(base);
        fallbackUsed = true;
      }
    }
    expect(fallbackUsed).toBe(true);
  });
});
