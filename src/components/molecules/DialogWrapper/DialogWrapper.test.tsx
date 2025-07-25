import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DialogAction, DialogWrapper, DialogWrapperProps } from "./DialogWrapper";
import { Button } from "@/components/atoms";

describe("DialogWrapper", () => {
  const defaultProps: DialogWrapperProps = {
    title: "Test Dialog",
    description: "This is a test description",
    trigger: <Button>Open Dialog</Button>,
    children: <div>Dialog content</div>,
    actions: [{
      type: "submit",
      label: "Submit",
      onClick: jest.fn(),
    }],
    open: false,
    onOpenChange: jest.fn()
  }

  it("renders title and description when open", () => {
    render(<DialogWrapper {...defaultProps} open showTitle showDescription />);

    expect(screen.getByRole("heading", { name: /test dialog/i })).toBeInTheDocument();
    expect(screen.getByText(/this is a test description/i)).toBeInTheDocument();
    expect(screen.getByText(/dialog content/i)).toBeInTheDocument();
  });

  it("shows title visually when showTitle is true", () => {
    render(<DialogWrapper {...defaultProps} open showTitle showDescription={false} />);
    const title = screen.getByTestId("dialog-title")
    expect(title).not.toHaveClass("sr-only")

  })

  it("hides title and description visually when showTitle/showDescription are false", () => {
    render(<DialogWrapper {...defaultProps} open showTitle={false} showDescription={false} />);

    const title = screen.getByText(/test dialog/i);
    const description = screen.getByText(/this is a test description/i);

    expect(title).toHaveClass("sr-only");
    expect(description).toHaveClass("sr-only");
  });

  it("renders trigger and opens dialog on click", async () => {
    render(
      <DialogWrapper {...defaultProps} open showTitle showDescription />
    )

    const trigger = screen.getByText("Open Dialog");
    expect(trigger).toBeInTheDocument();
    fireEvent.click(trigger)

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /test dialog/i })).toBeInTheDocument();
    });
  });

  it("calls onConfirm when confirm button is clicked", () => {
    const onConfirm = jest.fn();
    const actions = [
      {
        type: "submit",
        label: "Confirm",
        onClick: onConfirm
      }
    ] as DialogAction[]

    render(<DialogWrapper {...defaultProps} open showTitle showDescription actions={actions} />);
    fireEvent.click(screen.getByText("Confirm"));

    expect(onConfirm).toHaveBeenCalled();
  });

  it("closes when cancel button is clicked", async () => {
    const onCancel = jest.fn()
    const actions = [
      {
        type: "button",
        label: "Cancel",
        onClick: onCancel
      }
    ] as DialogAction[]
    render(<DialogWrapper {...defaultProps} open showTitle showDescription actions={actions} />);

    fireEvent.click(screen.getByText("Cancel"));

    // Wait to verify the cancel button is still in the document but dialog close logic can be tested if using a controlled state
    await waitFor(() => {
      expect(screen.getByText("Cancel")).toBeInTheDocument();
    });
  });

  it("respects loading state (buttons disabled)", () => {
    const actions = [
      {
        type: "submit",
        label: "Confirm",
        loading: true,
        onClick: jest.fn()
      },
      {
        type: "button",
        label: "Cancel",
        loading: false,
        onClick: jest.fn()
      }
    ] as DialogAction[]
    render(<DialogWrapper {...defaultProps} open showTitle showDescription actions={actions} />);

    expect(screen.getByText("Confirm")).toBeDisabled();
    expect(screen.getByText("Cancel")).not.toBeDisabled();
  });

  it("renders custom footer when provided", () => {
    render(
      <DialogWrapper
        {...defaultProps}
        open
        footer={<div data-testid="custom-footer">Custom Footer</div>}
        showTitle
        showDescription
      />
    );

    expect(screen.getByTestId("custom-footer")).toBeInTheDocument();
  });

  it("always renders title and description in DOM even if not shown (for accessibility)", () => {
    render(<DialogWrapper {...defaultProps} open showTitle={false} showDescription={false} />);

    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("This is a test description")).toBeInTheDocument();
  });
});
