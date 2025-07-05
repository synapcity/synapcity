import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input"; // Adjust path as needed
import "@testing-library/jest-dom";

describe("Input component", () => {
  it("renders the input with default props", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders error styles and error text", () => {
    render(<Input error errorText={["Something went wrong"]} />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders helper text when no error is present", () => {
    render(<Input helperText="This is a helper" />);
    expect(screen.getByText("This is a helper")).toBeInTheDocument();
  });
  it("applies success styles when `success` is true", () => {
    const { container } = render(<Input success />);
    const input = container.querySelector('[data-slot="input"]');
    expect(input).toHaveClass("border-success");
  });

  it("renders an icon when `icon` is provided and `isIconButton` is false", () => {
    const { container } = render(<Input icon="Search" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders an icon button when `isIconButton` is true", () => {
    render(<Input icon="Search" isIconButton />);
    const button = screen.getByRole("button", { name: /icon action/i });
    expect(button).toBeInTheDocument();
  });

  it("calls `onIconClick` when icon button is clicked", () => {
    const handleClick = jest.fn();
    render(<Input icon="Search" isIconButton onIconClick={handleClick} />);
    const button = screen.getByRole("button", { name: /icon action/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it("toggles password visibility and calls `onPasswordToggle`", () => {
    const toggleMock = jest.fn();
    const { container } = render(
      <Input isPassword type="password" onPasswordToggle={toggleMock} />
    );

    const toggleBtn = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });

    const input = container.querySelector('[data-slot="input"]') as HTMLInputElement;
    expect(input).toHaveAttribute("type", "password");

    fireEvent.click(toggleBtn);
    expect(toggleMock).toHaveBeenCalled();
    expect(input).toHaveAttribute("type", "text"); // visibility toggled
  });


  it("sets input type to password initially when isPassword is true", () => {
    const { container } = render(<Input isPassword type="password" />);
    const input = container.querySelector('[data-slot="input"]') as HTMLInputElement;
    expect(input).toHaveAttribute("type", "password");
  });

  it("forwards refs correctly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
