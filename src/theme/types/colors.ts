export type ColorShade =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";

export type ColorModeScale = {
  foreground: string;
  background: string;
  scale: Record<ColorShade, string>;
};

export type SemanticColor = {
  base: string;
  light: ColorModeScale;
  dark: ColorModeScale;
};

export type ColorType = "primary" | "accent";
