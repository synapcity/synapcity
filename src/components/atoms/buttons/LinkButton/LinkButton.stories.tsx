import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LinkButton } from "./LinkButton";

const meta: Meta<typeof LinkButton> = {
  title: "Atoms/Buttons/LinkButton",
  component: LinkButton,
  args: {
    href: "#",
    children: "Link Button",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LinkButton>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const IconOnly: Story = {
  args: {
    icon: "Link",
    isIconOnly: true,
    size: "md",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};
export const WithTooltip: Story = {
  args: {
    tooltip: "This is a link button tooltip",
  },
};