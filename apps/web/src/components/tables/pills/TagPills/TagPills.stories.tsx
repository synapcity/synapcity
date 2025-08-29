import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TagPills } from "./TagPills";

const meta: Meta<typeof TagPills> = {
  title: "Components/TagPills",
  component: TagPills,
  argTypes: {
    tags: { control: "object" },
    onRemove: { action: "remove" },
    onClick: { action: "click" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof TagPills>;

export const Default: Story = {
  args: {
    tags: [
      { label: "Work", value: "work" },
      { label: "Personal", value: "personal" },
      { label: "Urgent", value: "urgent" },
    ],
  },
};

export const NoTags: Story = {
  args: {
    tags: [],
  },
};

export const CustomColors: Story = {
  args: {
    tags: [
      { label: "High Priority", value: "high", color: "#e53e3e" },
      { label: "Low Priority", value: "low", color: "#38a169" },
      { label: "Info", value: "info", color: "#3182ce" },
    ],
  },
};

export const RemovableOnly: Story = {
  args: {
    tags: [
      { label: "Remove Me", value: "r1", color: "#805ad5" },
      { label: "Also Me", value: "r2" },
    ],
    onRemove: () => {},
  },
};

export const ClickableOnly: Story = {
  args: {
    tags: [
      { label: "Click Me", value: "c1" },
      { label: "Also Click", value: "c2", color: "#dd6b20" },
    ],
    onClick: () => {},
  },
};

export const ClickableAndRemovable: Story = {
  args: {
    tags: [
      { label: "Item A", value: "a", color: "#2b6cb0" },
      { label: "Item B", value: "b" },
      { label: "Item C", value: "c", color: "#d69e2e" },
    ],
    onClick: () => {},
    onRemove: () => {},
  },
};

export const LongLabels: Story = {
  args: {
    tags: [
      {
        label: "This is a very long tag label to test wrapping behavior",
        value: "long1",
      },
      {
        label: "Another extra-long tag that should wrap",
        value: "long2",
      },
    ],
  },
};

export const CustomWrapperClass: Story = {
  args: {
    tags: [
      { label: "Styled", value: "styled", color: "#d53f8c" },
      { label: "Via Class", value: "classy" },
    ],
    className: "bg-gray-100 p-4 rounded-lg",
  },
};
