export const colord = (color: string) => {
  const actual = jest.requireActual("colord");
  return {
    ...actual,
    mix: () => ({ toHex: () => "#ffffff" }),
    tints: (count: number) => {
      if (color === "#abcdef") {
        return [{ toHex: () => "#111111" }, { toHex: () => "#222222" }];
      }
      return Array.from({ length: count }, (_, i) => ({
        toHex: () => `#${(parseInt(color.replace("#", ""), 16) + i).toString(16).padStart(6, "0")}`,
      }));
    },
    shades: (count: number) => {
      if (color === "#abcdef") {
        return [{ toHex: () => "#999999" }];
      }
      return Array.from({ length: count }, (_, i) => ({
        toHex: () => `#${(parseInt(color.replace("#", ""), 16) - i).toString(16).padStart(6, "0")}`,
      }));
    },
    isValid: () => {
      if (color === "$%^^$%#") {
        return false;
      }
      return !Object.values(color).every((value) => /^#([0-9a-fA-F]{6})$/.test(value));
    },
  };
};

export const extend = jest.fn();
