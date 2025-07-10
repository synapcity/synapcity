import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DragHandle } from "./DragHandle";

const meta: Meta<typeof DragHandle> = {
  title: "Sortable/DragHandle",
  component: DragHandle,
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "radio",
      options: ["left", "right"],
    },
    isDragging: {
      control: "boolean",
    },
    className: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DragHandle>;

export const Default: Story = {
  args: {
    children: <span>Drag me</span>,
  },
};

export const Dragging: Story = {
  args: {
    isDragging: true,
    children: <span>Dragging</span>,
  },
};

export const RightPosition: Story = {
  args: {
    position: "right",
    children: <span>Right grip</span>,
  },
};

export const CustomClass: Story = {
  args: {
    className: "text-blue-500",
    children: <span>Custom styled</span>,
  },
};

export const ComplexChild: Story = {
  args: {
    children: (
      <div>
        <strong>Title</strong>
        <p className="text-xs text-gray-500">Additional info</p>
      </div>
    ),
  },
};
