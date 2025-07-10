import { render, screen } from "@testing-library/react";
import { DragHandle } from "./DragHandle";

describe("DragHandle", () => {
  it("renders children content", () => {
    render(<DragHandle><span>Drag Me</span></DragHandle>);
    expect(screen.getByText("Drag Me")).toBeInTheDocument();
  });

  it("applies dragging class when isDragging is true", () => {
    render(<DragHandle isDragging>Dragging</DragHandle>);
    const container = screen.getByTestId("drag-handle");
    expect(container).toHaveClass("cursor-grabbing");
  });

  it("defaults to left position", () => {
    render(<DragHandle><span>Default</span></DragHandle>);
    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveClass("left-0");
    expect(icon).not.toHaveClass("right-0");
  });

  it("uses right position if specified", () => {
    render(<DragHandle position="right"><span>Right</span></DragHandle>);
    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveClass("right-0");
    expect(icon).not.toHaveClass("left-0");
  });

  it("has reduced opacity when dragging", () => {
    render(<DragHandle isDragging><span>Drag</span></DragHandle>);
    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveClass("opacity-50");
    expect(icon).not.toHaveClass("opacity-100");
  });

  it("applies custom className to icon", () => {
    render(<DragHandle className="my-custom-class"><span>Custom</span></DragHandle>);
    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveClass("my-custom-class");
  });

  it("passes additional props to the container", () => {
    render(<DragHandle data-testid="drag-root"><span>Extra</span></DragHandle>);
    expect(screen.getByTestId("drag-root")).toBeInTheDocument();
  });
});
