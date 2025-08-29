import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LinkedResourcesCell from "./LinkedResourcesCell";

const meta: Meta<typeof LinkedResourcesCell> = {
  title: "Table/LinkedResourcesCell",
  component: LinkedResourcesCell,
  tags: ["autodocs"],
  argTypes: {
    resources: { control: "object" },
  },
};
export default meta;

type Story = StoryObj<typeof LinkedResourcesCell>;

export const Empty: Story = {
  args: { resources: [] },
};

export const Single: Story = {
  args: { resources: [{ resourceId: "1", label: "One", type: "note" }] },
};

export const Multiple: Story = {
  args: {
    resources: [
      { resourceId: "1", label: "One", type: "note" },
      { resourceId: "2", label: "Two", type: "dashboard" },
    ],
  },
};

export const LongLabels: Story = {
  args: {
    resources: [
      {
        resourceId: "3",
        label: "This is a very long label to test wrapping in the cell component",
        type: "note",
      },
    ],
  },
};
