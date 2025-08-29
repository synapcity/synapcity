import { render, screen, fireEvent } from "@testing-library/react";
import { ResetThemeButton } from ".";
import { resetTheme } from "@/theme/utils/resetTheme";

jest.mock("@/theme/utils/resetTheme", () => ({
  resetTheme: jest.fn(),
}));

describe("ResetThemeButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls resetTheme for global when no props provided", () => {
    render(<ResetThemeButton />);

    const button = screen.getByTestId("reset-theme-button");
    fireEvent.click(button);

    expect(resetTheme).toHaveBeenCalledWith({});
  });

  it("calls resetTheme with scope, id, and element", () => {
    const element = document.createElement("div");

    render(<ResetThemeButton scope="note" id="abc" element={element} />);

    const button = screen.getByTestId("reset-theme-button");
    fireEvent.click(button);

    expect(resetTheme).toHaveBeenCalledWith({
      scope: "note",
      id: "abc",
      element,
    });
  });
});
