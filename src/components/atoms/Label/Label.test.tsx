import React from "react";
import { render, screen } from "@testing-library/react";
import { Label } from "./Label";
import "@testing-library/jest-dom";

describe("Label component", () => {
  it("renders label text (children)", () => {
    render(<Label>This is a label</Label>);
    const label = screen.getByText("This is a label");
    expect(label).toBeInTheDocument();
  });

  it("renders an icon when `icon` prop is provided", () => {
    const { container } = render(<Label icon="Info">Label with Icon</Label>);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders helper text when `helperText` is provided and no error", () => {
    render(<Label helperText="Some helpful text">Label</Label>);
    expect(screen.getByText("Some helpful text")).toBeInTheDocument();
  });

  it("does not render helper text if `error` is true", () => {
    render(
      <Label helperText="Some helpful text" error>
        Label
      </Label>
    );
    expect(screen.queryByText("Some helpful text")).not.toBeInTheDocument();
  });

  it("renders error text when `error` is true", () => {
    render(<Label error>Label</Label>);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("applies custom class name", () => {
    const { container } = render(<Label className="text-blue-500">Label</Label>);
    const label = container.querySelector('[data-slot="label"]');
    expect(label).toHaveClass("text-blue-500");
  });
});
