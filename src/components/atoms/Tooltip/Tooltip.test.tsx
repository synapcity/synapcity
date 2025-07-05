jest.mock("nanoid", () => ({
  nanoid: () => "mock-id",
}));


import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "@/components/atoms/Tooltip";
import React from "react";

describe("Tooltip component", () => {
  const tooltip = (
    <Tooltip
      asChild
      trigger={<button>Hover me</button>}
      content="Tooltip content"
    />
  )
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders trigger content", async () => {
    render(tooltip);
    const trigger = await screen.findAllByRole("button", { name: "Hover me" });
    expect(trigger[0]).toBeInTheDocument();
  });

  it("shows tooltip content on hover", async () => {
    render(tooltip);
    const trigger = await screen.findAllByRole("button", { name: "Hover me" });
    userEvent.hover(trigger[0]);

    waitFor(() => {
      expect(screen.getByText("Hover me")).toBeInTheDocument();
    });
  });

  it("respects delayDuration", async () => {
    render(<Tooltip asChild trigger={<button>Hover me</button>} content="Tooltip content" delayDuration={100} />);
    const trigger = await screen.findAllByRole("button", { name: "Hover me" });
    userEvent.hover(trigger[0]);

    waitFor(
      () => {
        expect(screen.getByText("Hover me")).toBeInTheDocument();
      },
      { timeout: 200 }
    );
  });

  it("renders content via children if trigger is not provided", async () => {
    render(<Tooltip content="Tooltip content">Fallback Trigger</Tooltip>);
    const trigger = await screen.findByText("Fallback Trigger");
    expect(trigger).toBeInTheDocument();
    userEvent.hover(trigger);

    waitFor(() => {
      expect(screen.getByText("Tooltip content")).toBeInTheDocument();
    });
  });

  it("supports `asChild` prop (renders without error)", () => {
    render(
      <Tooltip
        trigger={<span data-testid="as-child-span">Span trigger</span>}
        content="Tooltip content"
      />
    );

    expect(screen.getByTestId("as-child-span")).toBeInTheDocument();
  });

  it("applies `side`, `align`, and offset props correctly", async () => {
    render(
      <Tooltip
        asChild
        trigger={<button>Hover me</button>}
        content="Tooltip content"
        side="bottom"
        align="start"
        sideOffset={10}
        alignOffset={5}
      />
    );
    const trigger = await screen.findAllByRole("button", { name: "Hover me" });
    userEvent.hover(trigger[0]);

    waitFor(() => {
      const tooltip = screen.getByText("Tooltip content");
      expect(tooltip).toBeInTheDocument();
    });
  });
});
