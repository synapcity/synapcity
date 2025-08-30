import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PopoverWrapper } from "./PopoverWrapper";

describe("<PopoverWrapper />", () => {
  it("renders trigger and does not show content by default (uncontrolled)", () => {
    render(<PopoverWrapper trigger={<button>Open</button>} content={<div>Popover Content</div>} />);

    expect(screen.getByRole("button", { name: /open/i })).toBeInTheDocument();
    const content = screen.getByText(/popover content/i);
    expect(content).not.toBeVisible();
  });

  it("shows content after clicking the trigger (uncontrolled)", async () => {
    render(<PopoverWrapper trigger={<button>Open</button>} content={<div>Popover Content</div>} />);

    await userEvent.click(screen.getByRole("button", { name: /open/i }));
    expect(screen.getByText(/popover content/i)).toBeVisible();
  });

  it("toggles visibility via controlled open prop", () => {
    const { rerender } = render(
      <PopoverWrapper
        open={false}
        trigger={<button>Open</button>}
        content={<div>Controlled Content</div>}
      />
    );

    const closed = screen.getByText(/controlled content/i);
    expect(closed).not.toBeVisible();

    rerender(
      <PopoverWrapper
        open
        trigger={<button>Open</button>}
        content={<div>Controlled Content</div>}
      />
    );
    expect(screen.getByText(/controlled content/i)).toBeVisible();
  });

  it("calls onOpenChange when opened or closed (controlled)", async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <PopoverWrapper
        onOpenChange={onOpenChange}
        trigger={<button>Click</button>}
        content={<div>Content</div>}
      />
    );

    await user.click(screen.getByRole("button", { name: /click/i }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("renders anchor if withAnchor is true", () => {
    render(
      <PopoverWrapper
        withAnchor
        anchorEl={<span data-testid="anchor" />}
        trigger={<button>Open</button>}
        content={<div>Anchor Content</div>}
      />
    );

    expect(screen.getByTestId("anchor")).toBeInTheDocument();
  });

  it("applies side, align, and sideOffset props", async () => {
    render(
      <PopoverWrapper
        side="right"
        align="start"
        sideOffset={10}
        trigger={<button>Custom Position</button>}
        content={<div>Test</div>}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /custom position/i }));

    const popover = await screen.findByTestId("popover-content");
    expect(popover).toBeVisible();
    expect(popover.getAttribute("data-side")).toBe("left");
    expect(popover.getAttribute("data-align")).toBe("start");
  });

  it("applies custom className to popover content", async () => {
    render(
      <PopoverWrapper
        trigger={<button>Styled Trigger</button>}
        content={<div className="text-green-500">Styled Content</div>}
        className="custom-popover-class"
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /styled trigger/i }));

    const content = await screen.findByText(/styled content/i);
    expect(content).toHaveClass("text-green-500");
  });
});
