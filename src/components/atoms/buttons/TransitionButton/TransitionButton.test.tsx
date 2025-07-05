jest.mock('@/components', () => {
  const actual = jest.requireActual('@/components');
  return {
    ...actual,
    Tooltip: ({ trigger, children, content }: any) => (
      <>
        {trigger || children}
        {typeof content === 'string' ? (
          <div data-testid="tooltip-content">{content}</div>
        ) : (
          content
        )}
      </>
    ),
  };
});


import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TransitionButton } from "./TransitionButton";
import { CheckCircle2, Star } from "lucide-react";
import { renderWithTooltip } from "@/__mocks__";

const SuccessIcon = <CheckCircle2 data-testid="success-icon" />;
const CustomIcon = <Star data-testid="custom-icon" />;

describe("TransitionButton", () => {
  it("renders loader icon when loading", () => {
    const { container } = render(<TransitionButton isLoading>Click</TransitionButton>);
    const spinner = container.querySelector("svg");
    expect(spinner).toBeInTheDocument();
    expect(spinner?.getAttribute("class")).toMatch(/animate-spin/);
  })

  it("renders success icon when showSuccessIcon is true", () => {
    const { getByTestId } = render(
      <TransitionButton showSuccessIcon successIcon={SuccessIcon}>Click</TransitionButton>
    );
    expect(getByTestId("success-icon")).toBeInTheDocument();
  });

  it("renders custom icon when not loading or in success", () => {
    const { getByTestId } = render(
      <TransitionButton icon={CustomIcon}>Click</TransitionButton>
    );
    expect(getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders loading text", () => {
    render(<TransitionButton isLoading loadingText="Please wait...">Click</TransitionButton>);
    expect(screen.getByText("Please wait...")).toBeInTheDocument();
  });

  it("renders success text after loading ends", async () => {
    jest.useFakeTimers();
    const { rerender } = render(
      <TransitionButton
        isLoading
        successIcon={<CheckCircle2 data-testid="success-icon" />}
        showSuccessIcon
        successText="Done!"
      >
        Submit
      </TransitionButton>
    );

    await act(async () => {
      rerender(
        <TransitionButton
          isLoading={false}
          successIcon={<CheckCircle2 data-testid="success-icon" />}
          showSuccessIcon
          successText="Done!"
        >
          Submit
        </TransitionButton>
      );
      jest.advanceTimersByTime(1500);
      await Promise.resolve();
    });

    const doneText = await screen.findByText("Done!", {}, { timeout: 3000 });
    expect(doneText).toBeInTheDocument();

    jest.useRealTimers();
  });



  it("renders fallback text when not loading or success", () => {
    render(<TransitionButton>Save</TransitionButton>);
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("sets aria-label to 'Action' if children is not string", () => {
    const { container } = render(<TransitionButton>{<span>Label</span>}</TransitionButton>);
    const button = container.querySelector("button");
    expect(button).toHaveAttribute("aria-label", "Action");
  });

  it("uses children string as aria-label", () => {
    render(<TransitionButton>Save</TransitionButton>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("aria-label", "Save");
  });

  it("shows tooltip if tooltip and hideTextOnLoading are set", async () => {
    renderWithTooltip(
      <TransitionButton isLoading tooltip="Hello Tooltip" hideTextOnLoading>
        Submit
      </TransitionButton>
    );

    const button = screen.getByRole("button");
    await userEvent.hover(button);

    const tooltip = await screen.findByTestId("tooltip-content");
    expect(tooltip).toHaveTextContent("Hello Tooltip");
  });


  it("disables button when loading", () => {
    const { container } = render(<TransitionButton isLoading>Click</TransitionButton>);
    const button = container.querySelector("button");
    expect(button).toBeDisabled();
  });

  it("calls action and onSuccess when clicked", () => {
    const action = jest.fn();
    const onSuccess = jest.fn();

    render(<TransitionButton action={action} onSuccess={onSuccess}>Click</TransitionButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(action).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalled();
  });

  it("does not call action if type is submit", () => {
    const action = jest.fn();
    render(<TransitionButton type="submit" action={action}>Submit</TransitionButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(action).not.toHaveBeenCalled();
  });

  it("applies small screen hide class when hideTextOnSmallScreens is true", async () => {
    const { container } = render(
      <TransitionButton hideTextOnSmallScreens isLoading={false}>
        Hidden on Small
      </TransitionButton>
    );

    await waitFor(() => {
      const spans = container.querySelectorAll("span");
      const target = Array.from(spans).find((el) =>
        el.textContent?.includes("Hidden on Small")
      );
      expect(target).toHaveClass("hidden", "sm:inline");
    });
  });


});
