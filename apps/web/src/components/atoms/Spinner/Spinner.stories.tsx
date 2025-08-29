import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "number" },
      description: "Tailwind size scale (e.g. 4 = h-4 w-4)",
      defaultValue: 4,
    },
    withMargin: {
      control: { type: "boolean" },
      description: "Adds margin-right for inline usage",
    },
    label: {
      control: { type: "text" },
      description: "Screen-reader only label (not visibly rendered)",
    },
    className: {
      control: { type: "text" },
      description: "Additional custom classes (e.g. text-primary)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {},
};

export const WithMargin: Story = {
  args: {
    withMargin: true,
  },
};

export const LargeSize: Story = {
  args: {
    size: 8,
  },
};

export const CustomLabel: Story = {
  args: {
    label: "Loading data...",
  },
};

export const CustomColor: Story = {
  args: {
    className: "text-accent",
  },
};

export const Combined: Story = {
  args: {
    size: 6,
    withMargin: true,
    label: "Syncing...",
    className: "text-blue-500",
  },
};
