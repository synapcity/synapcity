import { COLOR_SHADE_KEYS } from "@/theme/constants";
import { reverseColorScale } from "./reverseColorScale";
import { generateColorScale } from "../generateColorScale";

describe("reverseColorScale", () => {
  it("should reverse the color scale correctly", () => {
    const base = "#f97316";
    const original = generateColorScale(base);
    const reversed = reverseColorScale(original);

    const keys = COLOR_SHADE_KEYS;
    keys.forEach((shade, i) => {
      const opposite = keys[keys.length - 1 - i];
      expect(reversed[shade]).toEqual(original[opposite]);
    });
  });
});
