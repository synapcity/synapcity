import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
    },
    fallbackText: {
      control: "text",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg", "xl"],
    },
    ring: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    fallbackText: "JD",
  },
};

export const WithImage: Story = {
  args: {
    fallbackText: "JD",
    src: "https://i.pravatar.cc/150?img=23",
  },
};

export const WithRing: Story = {
  args: {
    fallbackText: "AV",
    src: "https://i.pravatar.cc/150?img=33",
    ring: true,
  },
};

export const CustomSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar fallbackText="S" size="sm" />
      <Avatar fallbackText="M" size="md" />
      <Avatar fallbackText="L" size="lg" />
      <Avatar fallbackText="XL" size="xl" />
    </div>
  ),
};
