/* eslint-disable @typescript-eslint/no-explicit-any */
jest.mock("nanoid", () => ({
  nanoid: () => "mock-id",
}));

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Icon } from "./Icon";

jest.mock("lucide-react", () => {
  return {
    ...jest.requireActual("lucide-react"),
    Settings: (props: any) => <svg data-testid="custom-icon" {...props} />,
    AlertCircle: (props: any) => <svg data-testid="lucide-alert-circle" {...props} />,
  };
});

jest.mock("@iconify/react", () => ({
  Icon: (props: any) => <svg data-testid="iconify-icon" {...props} />,
}));

describe("Icon component", () => {
  it("renders a Lucide icon by name", () => {
    render(<Icon name="settings" size="md" />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("matches Lucide icons regardless of case", () => {
    render(<Icon name="Search" size="md" />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("supports EyeClosed alias", () => {
    render(<Icon name="EyeClosed" size="md" />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders an Iconify icon when source is iconify", () => {
    render(<Icon name="mdi:home" source="iconify" size="md" />);
    expect(screen.getByTestId("iconify-icon")).toBeInTheDocument();
  });

  it("renders a custom icon component when passed", () => {
    const CustomIcon = (props: any) => <svg data-testid="custom-icon" {...props} />;
    render(<Icon icon={CustomIcon} size="md" />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders fallback icon when no name or icon component provided", () => {
    render(<Icon />);
    expect(screen.getByTestId("lucide-alert-circle")).toBeInTheDocument();
  });

  it("renders fallback icon when name not found in lucide icons", () => {
    jest.spyOn(console, "warn").mockImplementation(() => {});

    render(<Icon name="NonExistentIcon" />);
    expect(screen.getByTestId("lucide-alert-circle")).toBeInTheDocument();

    (console.warn as jest.Mock).mockRestore();
  });

  it("renders fallback icon for non-existent name regardless of casing", () => {
    jest.spyOn(console, "warn").mockImplementation(() => {});

    render(<Icon name="NonexistentICON" />);
    expect(screen.getByTestId("lucide-alert-circle")).toBeInTheDocument();

    (console.warn as jest.Mock).mockRestore();
  });

  it("renders tooltip when tooltip prop is provided", async () => {
    render(<Icon name="settings" tooltip="Settings tooltip" data-testid="lucide-settings" />);

    const icon = screen.getByTestId("lucide-settings");
    expect(icon).toBeInTheDocument();

    expect(screen.queryAllByText("Settings tooltip")).toBeNull();

    await userEvent.hover(icon);

    waitFor(() => {
      expect(screen.getAllByText("Settings tooltip")).toBeVisible();
    });
    await userEvent.unhover(icon);
  });

  it("passes accessibility attributes correctly", () => {
    render(<Icon name="Settings" label="Settings label" />);
    const icon = screen.getByLabelText("Settings label");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-hidden", "false");
  });

  it("sets aria-hidden true if no label or tooltip", () => {
    render(<Icon name="settings" />);
    const icon = screen.getByTestId("custom-icon");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
});
