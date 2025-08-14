import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InboxTrigger } from "./InboxTrigger";
import { Collapsible } from "@/components/atoms/ui/collapsible";

const meta: Meta<typeof InboxTrigger> = {
  title: "Toggles/InboxTrigger",
  component: InboxTrigger,
  argTypes: {
    className: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof InboxTrigger>;

export const Default: Story = {
  render: (args) => (
    <Collapsible>
      <InboxTrigger {...args} />
    </Collapsible>
  ),
};

export const CustomLabel: Story = {
  render: (args) => (
    <Collapsible>
      <InboxTrigger {...args} />
    </Collapsible>
  ),
};

export const WithCustomClass: Story = {
  args: {
    className: "bg-blue-100 border border-blue-300",
  },
  render: (args) => (
    <Collapsible>
      <InboxTrigger {...args} />
    </Collapsible>
  ),
};
