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

  it("uses the original key for non-md entries", () => {
    const result = generateFontSizeVars("lg");

    expect(result).toHaveProperty("--text-base");
    expect(result).toHaveProperty("--text-xs");
    expect(result).toHaveProperty("--text-lg");
    expect(result["--text-lg"]).toMatch(/^clamp\(/);
  });

  it("generates computedKey correctly for non-'md' keys", () => {
    const result = generateFontSizeVars("sm");

    expect(result).toHaveProperty("--text-xs");
    expect(result).toHaveProperty("--text-sm");
    expect(result).toHaveProperty("--text-lg");
    expect(result).toHaveProperty("--text-xl");
    expect(result).toHaveProperty("--text-2xl");
    expect(result).not.toHaveProperty("--text-md");
    expect(result).toHaveProperty("--text-base");
  });

  it("falls back to scale and base if toFixed returns undefined", () => {
    const base = fontScaleFactors.md;
    const scale = fontScaleFactors.md;

    const originalToFixed = Number.prototype.toFixed;

    Number.prototype.toFixed = function () {
      return undefined as unknown as string;
    };

    const result = generateFontSizeVars("md");

    expect(result["--text-base"]).toBe(
      `clamp(${scale}rem, ${base * scale}rem + 0.5vw, ${scale}rem)`
    );

    Number.prototype.toFixed = originalToFixed;
  });
});
