import { render, screen } from "@testing-library/react";
import { IconButton } from "./IconButton";
import userEvent from "@testing-library/user-event";

describe("IconButton", () => {
  it("renders icon from default source", () => {
    render(<IconButton icon="Plus" aria-label="Add" />);
    const icon = screen.getByLabelText("Add");
    expect(icon).toBeInTheDocument();
  });

  it("shows spinner when loading", () => {
    render(<IconButton icon="Plus" isLoading aria-label="Loading" />);
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });

  it("hides icon when loading", () => {
    render(<IconButton icon="Plus" isLoading aria-label="Loading" />);
    const icon = screen.queryByTestId("icon");
    expect(icon).not.toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = jest.fn();
    render(<IconButton icon="Pencil" label="Edit" onClick={onClick} aria-label="Edit" />);
    await userEvent.click(screen.getByLabelText("Edit"));
    expect(onClick).toHaveBeenCalled();
  });

  it("supports different icon sources", () => {
    render(<IconButton icon="carbon:add" iconSource="iconify" aria-label="Add Hero" />);
    const button = screen.getByLabelText("Add Hero");
    expect(button).toBeInTheDocument();
  });

  it("respects fullWidth prop", () => {
    render(<IconButton icon="Plus" fullWidth aria-label="Add Full Width" />);
    const button = screen.getByLabelText("Add Full Width");
    expect(button.className).toMatch(/w-full/);
  });
});
