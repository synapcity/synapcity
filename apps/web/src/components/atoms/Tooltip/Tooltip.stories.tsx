import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tooltip, TooltipProps } from "./Tooltip";

const meta: Meta<TooltipProps> = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  args: {
    content: "This is a tooltip",
    trigger: <button>Hover me</button>,
    delayDuration: 0,
    side: "top",
    align: "center",
  },
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
    content: { control: "text" },
    delayDuration: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<TooltipProps>;

export const Default: Story = {};

export const WithDelay: Story = {
  args: {
    delayDuration: 700,
  },
};

export const AsChild: Story = {
  args: {
    asChild: true,
    trigger: <span style={{ padding: "4px", background: "#eee" }}>Hover span</span>,
  },
};

export const BottomLeft: Story = {
  args: {
    side: "bottom",
    align: "start",
  },
};

export const CustomContent: Story = {
  args: {
    content: (
      <div>
        <strong>Custom</strong> tooltip <em>content</em>
      </div>
    ),
  },
};

export const FallbackTrigger: Story = {
  args: {
    content: "Using children as trigger",
    trigger: undefined,
    children: <div style={{ padding: "6px", background: "#ddd" }}>Hover me</div>,
  },
};
