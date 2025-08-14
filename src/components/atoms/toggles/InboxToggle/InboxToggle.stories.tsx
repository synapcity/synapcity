import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useEffect } from "react";
import { within, userEvent, expect } from "@storybook/test";
import { InboxToggle } from "./InboxToggle";
import { useUIStore } from "@/stores/ui/uiStore";

function initUserPanelVisibility(visible: boolean) {
  useUIStore.getState().setCompState("userPanel", "isVisible", visible);
}

// Decorator factory that returns a **named** decorator component
function userPanelVisibilityDecoratorFactory(visible: boolean) {
  function UserPanelVisibilityDecorator(Story: React.ComponentType) {
    useEffect(() => {
      initUserPanelVisibility(visible);
    }, []);
    return (
      <div style={{ padding: 16 }}>
        <Story />
      </div>
    );
  }
  UserPanelVisibilityDecorator.displayName = "UserPanelVisibilityDecorator";
  return UserPanelVisibilityDecorator;
}

const meta: Meta<typeof InboxToggle> = {
  title: "Toggles/InboxToggle",
  component: InboxToggle,
  tags: ["autodocs"],
  parameters: { layout: "centered", controls: { disable: true } },
};
export default meta;

type Story = StoryObj<typeof InboxToggle>;

// Name the renderers too (avoid inline arrow fns returning JSX)
function DefaultClosedRender() {
  return <InboxToggle />;
}
DefaultClosedRender.displayName = "DefaultClosedRender";

function InitiallyOpenRender() {
  return <InboxToggle />;
}
InitiallyOpenRender.displayName = "InitiallyOpenRender";

function InteractiveRender() {
  return <InboxToggle />;
}
InteractiveRender.displayName = "InteractiveRender";

export const DefaultClosed: Story = {
  name: "Default (Closed)",
  decorators: [userPanelVisibilityDecoratorFactory(false)],
  render: DefaultClosedRender,
};

export const InitiallyOpen: Story = {
  decorators: [userPanelVisibilityDecoratorFactory(true)],
  render: InitiallyOpenRender,
};

export const InteractiveToggle: Story = {
  name: "Interactive (click to toggle)",
  decorators: [userPanelVisibilityDecoratorFactory(false)],
  render: InteractiveRender,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button");
    await expect(button).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(button);
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(button);
    await expect(button).toHaveAttribute("aria-pressed", "false");
  },
};
