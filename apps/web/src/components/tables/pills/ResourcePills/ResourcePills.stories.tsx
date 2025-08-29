import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ResourcePills } from "./ResourcePills";

const meta: Meta<typeof ResourcePills> = {
  title: "Table/ResourcePills",
  component: ResourcePills,
  tags: ["autodocs"],
  argTypes: { resources: { control: "object" } },
};
export default meta;

type Story = StoryObj<typeof ResourcePills>;

export const Empty: Story = { args: { resources: [] } };
export const Single: Story = {
  args: { resources: [{ resourceId: "1", label: "Sample", type: "note" }] },
};
export const Multiple: Story = {
  args: {
    resources: [
      { resourceId: "1", label: "One", type: "note" },
      { resourceId: "2", label: "Two", type: "dashboard" },
    ],
  },
};
export const LongLabel: Story = {
  args: {
    resources: [
      {
        resourceId: "3",
        label: "This is a very long label to test wrapping in the pill component",
        type: "widget",
      },
    ],
  },
};
