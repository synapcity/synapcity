// stories/Typography.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Typography } from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Components/atoms/Typography",
  component: Typography,
  args: {
    children: "Sample Text",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Lead: Story = {
  args: {
    variant: "lead",
  },
};

export const Large: Story = {
  args: {
    variant: "large",
  },
};

export const Small: Story = {
  args: {
    variant: "small",
  },
};

export const Muted: Story = {
  args: {
    variant: "muted",
  },
};

export const H1: Story = {
  args: {
    variant: "h1",
  },
};

export const H2: Story = {
  args: {
    variant: "h2",
  },
};

export const H3: Story = {
  args: {
    variant: "h3",
  },
};

export const H4: Story = {
  args: {
    variant: "h4",
  },
};

export const H5: Story = {
  args: {
    variant: "h5",
  },
};

export const H6: Story = {
  args: {
    variant: "h6",
  },
};

export const CustomTag: Story = {
  args: {
    variant: "lead",
    as: "span",
  },
};
