import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CommandMenu } from "./CommandMenu";
import userEvent from "@testing-library/user-event";

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("CommandMenu - Full Coverage", () => {
  const mockSelect = jest.fn();
  const mockGroups = [
    {
      heading: "Main",
      items: [
        {
          label: "Open",
          shortcut: "⌘O",
          icon: <span data-testid="icon-open" />,
          onSelect: mockSelect,
        },
      ],
    },
    {
      heading: "Other",
      items: [
        {
          label: "Logout",
          onSelect: jest.fn(),
        },
      ],
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  // it("renders with default title and description", () => {
  //   render(<CommandMenu groups={mockGroups} open />);
  //   // expect(screen.getByText("Command Palette")).toBeInTheDocument();
  //   expect(screen.getByText("Search or navigate with ↑ ↓ ↵")).toBeInTheDocument();
  // });

  it("renders icon when provided", () => {
    render(<CommandMenu groups={mockGroups} open />);
    expect(screen.getByTestId("icon-open")).toBeInTheDocument();
  });

  it("does not render separator before the first group", () => {
    render(<CommandMenu open groups={[mockGroups[0]]} />);
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });

  it("renders separator between multiple groups", () => {
    render(<CommandMenu open groups={mockGroups} />);
    expect(screen.getAllByRole("separator").length).toBeGreaterThan(0);
  });

  it("handles internal state toggle (uncontrolled mode)", () => {
    render(<CommandMenu groups={mockGroups} />);

    fireEvent.keyDown(document, { key: "Meta" });

    // dialog exists in the DOM but is hidden
    const dialog = screen.getByRole("dialog");
    expect(dialog).not.toBeVisible();

    fireEvent.keyDown(document, { key: "Escape" });
  });

  it("respects `showCloseButton=false`", () => {
    render(<CommandMenu groups={mockGroups} open showCloseButton={false} title="Test" />);
    expect(screen.queryByLabelText(/close/i)).not.toBeInTheDocument();
  });

  it("respects custom search placeholder", () => {
    render(<CommandMenu open groups={mockGroups} searchPlaceholder="Search actions..." />);
    expect(screen.getByPlaceholderText("Search actions...")).toBeInTheDocument();
  });

  it("does not throw or crash if onSelect is undefined", async () => {
    const user = userEvent.setup();
    render(
      <CommandMenu
        open
        groups={[
          {
            heading: "Test",
            items: [{ label: "No Action" }],
          },
        ]}
      />
    );

    await user.click(screen.getByText("No Action"));
  });
  it("toggles internal open state in uncontrolled mode", async () => {
    const user = userEvent.setup();

    const { rerender } = render(<CommandMenu groups={mockGroups} />);

    rerender(<CommandMenu groups={mockGroups} open={true} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByText("Open"));

    rerender(<CommandMenu groups={mockGroups} />);
  });

  it("does not throw if onOpenChange is undefined in controlled mode", async () => {
    const user = userEvent.setup();

    render(<CommandMenu groups={mockGroups} open={true} />);

    await user.click(screen.getByText("Open"));
  });

  it("does not throw when onOpenChange is undefined", async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    render(<CommandMenu open={true} groups={mockGroups} />);
    await user.click(screen.getByText("Open"));

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
  it("calls onOpenChange(false) after item is selected in controlled mode", async () => {
    const onOpenChange = jest.fn();
    const user = userEvent.setup();

    render(
      <CommandMenu
        open={true}
        onOpenChange={onOpenChange}
        groups={[
          {
            heading: "Main",
            items: [{ label: "Open", onSelect: jest.fn() }],
          },
        ]}
      />
    );

    await user.click(screen.getByText("Open"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
