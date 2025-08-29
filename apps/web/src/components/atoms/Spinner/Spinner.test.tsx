import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";
import React from "react";

describe("Spinner", () => {
  it("renders with default props", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Spinner className="text-red-500" />);
    const svg = screen.getByRole("status").querySelector("svg");
    expect(svg).toHaveClass("text-red-500");
  });

  it("supports custom size", () => {
    render(<Spinner size={6} />);
    const svg = screen.getByRole("status").querySelector("svg");
    expect(svg).toHaveClass("h-6");
    expect(svg).toHaveClass("w-6");
  });

  it("adds margin when withMargin is true", () => {
    render(<Spinner withMargin />);
    const svg = screen.getByRole("status").querySelector("svg");
    expect(svg).toHaveClass("mr-2");
  });

  it("renders custom label", () => {
    render(<Spinner label="Please wait" />);
    expect(screen.getByText("Please wait")).toBeInTheDocument();
  });

  it("does not render label when empty", () => {
    render(<Spinner label="" />);
    expect(screen.queryByText("Loading")).not.toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveAttribute("aria-busy", "true");
    expect(spinner).toHaveAttribute("aria-live", "polite");
  });
});
