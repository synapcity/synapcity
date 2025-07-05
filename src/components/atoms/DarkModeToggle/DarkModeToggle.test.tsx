jest.mock("@/stores/themeStore/useThemeStore", () => ({
  useThemeStore: jest.fn(),
}));

import { render, screen, fireEvent } from "@testing-library/react";
import { DarkModeToggle } from "./DarkModeToggle";
import { useThemeStore } from "@/stores/themeStore/useThemeStore";
import { DEFAULT_THEME } from "@/theme/defaults";

const mockUseThemeStore = useThemeStore as unknown as jest.Mock;

describe("DarkModeToggle", () => {
  const mockToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseThemeStore.mockImplementation((selector?: any) => {
      const state = {
        globalPreferences: { ...DEFAULT_THEME, mode: "dark" },
        toggleGlobalMode: mockToggle,
      };

      return typeof selector === "function" ? selector(state) : state;
    });

  });

  it("renders with sun icon when in dark mode", () => {
    render(<DarkModeToggle />);
    const icon = screen.getByTestId("custom-icon")
    expect(icon).toBeInTheDocument();
    const parentElement = icon.parentElement
    const button = screen.getByRole("button", { name: "Dark Mode" })
    expect(button).toBeInTheDocument()
    expect(button).toEqual(parentElement)
    expect(button).toHaveAttribute(
      "aria-label", "Dark Mode");
  });

  it("calls toggleGlobalMode on click", () => {
    render(<DarkModeToggle />);
    const button = screen.getByRole("button", { name: /dark mode/i });
    fireEvent.click(button);
    expect(mockToggle).toHaveBeenCalled();
  });

  it("renders with moon icon when in light mode", () => {
    mockUseThemeStore.mockImplementation((selector?: any) => {
      const state = {
        globalPreferences: { ...DEFAULT_THEME, mode: "light" },
        toggleGlobalMode: mockToggle,
      };

      return typeof selector === "function" ? selector(state) : state;
    });
    render(<DarkModeToggle />);
    const icon = screen.getByTestId("custom-icon")
    expect(icon).toBeInTheDocument();
    const parentElement = icon.parentElement
    const button = screen.getByRole("button", { name: "Light Mode" })
    expect(button).toBeInTheDocument()
    expect(button).toEqual(parentElement)
    expect(button).toHaveAttribute(
      "aria-label", "Light Mode");
  });
});
