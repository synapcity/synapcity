import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DialogWrapper } from "./DialogWrapper";
import { Button } from "@/components/atoms";

const meta: Meta<typeof DialogWrapper> = {
  title: "Molecules/DialogWrapper",
  component: DialogWrapper,
  tags: ["autodocs"],
  args: {
    title: "Confirm Action",
    description: "Are you sure you want to perform this action?",
    showTitle: true,
    showDescription: true,
  },
};

export default meta;
type Story = StoryObj<typeof DialogWrapper>;

export const Default: Story = {
  args: {
    trigger: <Button>Open Dialog</Button>,
    children: <p>This is some content inside the dialog.</p>,
    asChild: true,
  },
};

export const WithCustomFooter: Story = {
  args: {
    trigger: <Button>Open Dialog</Button>,
    footer: (
      <div className="flex justify-end gap-2 w-full">
        <Button variant="ghost">Dismiss</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    ),
    children: <p>You can insert any custom footer actions.</p>,
    asChild: true,
  },
};

export const LoadingState: Story = {
  args: {
    trigger: <Button>Open Dialog</Button>,
    children: <p>Simulating a pending state while confirming.</p>,
    asChild: true,
  },
};

export const NoTitleOrDescription: Story = {
  args: {
    trigger: <Button>Open Dialog</Button>,
    showTitle: false,
    showDescription: false,
    children: <p>The title and description are visually hidden.</p>,
    asChild: true,
  },
};

export const ControlledOpenState: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <DialogWrapper
        open={open}
        onOpenChange={setOpen}
        title="Controlled Dialog"
        description="This dialog is controlled via state."
      >
        <p>This dialog is opened by default and can be closed via button.</p>
      </DialogWrapper>
    );
  },
};
