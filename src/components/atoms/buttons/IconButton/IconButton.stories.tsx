import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Buttons/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: { type: "text" },
      description: "Name of the icon (Lucide, Heroicons, etc.)",
    },
    iconSource: {
      control: { type: "select" },
      options: ["lucide", "iconify"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    iconSize: {
      control: "number",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "destructive"],
    },
    isLoading: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    className: {
      control: "text",
    },
  },
  args: {
    icon: "Plus",
    "aria-label": "Add",
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithCustomSize: Story = {
  args: {
    iconSize: 24,
    size: "lg",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const IconifySource: Story = {
  args: {
    icon: "mingcute:right-fill",
    iconSource: "iconify",
    "aria-label": "Iconify Arrow",
  },
};

export const DestructiveVariant: Story = {
  args: {
    variant: "destructive",
    icon: "Trash",
    "aria-label": "Delete",
  },
};
