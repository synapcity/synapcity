import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { Plus, Trash2 } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Buttons/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};
export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
};
export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: "Loading",
  },
};

export const IconButton: Story = {
  args: {
    variant: "ghost",
    size: "sm",
    icon: "Plus",
    isIconOnly: true,
    children: <Plus />,
    "aria-label": "Add",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: (
      <>
        <Trash2 className="mr-2" /> Delete
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    variant: "disabled",
    size: "md",
    children: "Disabled",
  },
};

export const FullWidth: Story = {
  args: {
    variant: "primary",
    size: "md",
    fullWidth: true,
    children: "Full Width",
  },
};
export const WithIconAndLoading: Story = {
  args: {
    variant: "primary",
    size: "md",
    isLoading: true,
    children: (
      <>
        <Trash2 className="mr-2" /> Delete
      </>
    ),
  },
};

export const WithTooltip: Story = {
  args: {
    children: "Hover me",
    tooltip: "This is a button tooltip",
  },
};
