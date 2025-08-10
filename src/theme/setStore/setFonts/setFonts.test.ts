jest.mock("@/stores", () => ({
  useThemeStore: {
    getState: jest.fn(() => ({
      setPreferences: jest.fn(),
      setGlobalPreferences: jest.fn(),
    })),
  },
}));

import { setGlobalFonts, setScopedFonts } from "./setFonts";
import { useThemeStore } from "@/stores";

describe("setGlobalFonts", () => {
  it("sets global font preference", () => {
    const setGlobalPreferences = jest.fn();

    (useThemeStore.getState as jest.Mock).mockReturnValueOnce({
      setGlobalPreferences,
    });

    setGlobalFonts("size", "lg");

    expect(setGlobalPreferences).toHaveBeenCalledWith({
      size: "lg",
    });
  });
});

describe("setScopedFonts", () => {
  it("sets scoped font preference", () => {
    const setPreferences = jest.fn();

    (useThemeStore.getState as jest.Mock).mockReturnValueOnce({
      setPreferences,
    });

    setScopedFonts("note", "note-456", "fontFamilyBody", "serif");

    expect(setPreferences).toHaveBeenCalledWith("note", "note-456", {
      fontFamilyBody: "serif",
    });
  });
});
