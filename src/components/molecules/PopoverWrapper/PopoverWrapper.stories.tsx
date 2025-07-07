import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PopoverWrapper } from "./PopoverWrapper";
import { Button } from "@/components/atoms";

const meta: Meta<typeof PopoverWrapper> = {
  title: "Atoms/PopoverWrapper",
  component: PopoverWrapper,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof PopoverWrapper>;

export const Default: Story = {
  render: () => (
    <PopoverWrapper
      trigger={<Button>Open Popover</Button>}
      content={<div className="text-sm">Hello from the popover 👋</div>}
    />
  ),
};

export const Controlled: Story = {
  name: "Controlled Popover",
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <Button onClick={() => setOpen((prev) => !prev)}>
          Toggle from Outside
        </Button>

        <PopoverWrapper
          open={open}
          onOpenChange={setOpen}
          trigger={<Button variant="outline">Open Controlled</Button>}
          content={<div className="text-sm">Popover is {open ? "open" : "closed"}</div>}
        />
      </div>
    );
  },
};

export const SideAndAlign: Story = {
  name: "Side & Align Variants",
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <PopoverWrapper
        side="top"
        align="start"
        trigger={<Button>Top Start</Button>}
        content={<div className="text-sm">Top + Start</div>}
      />
      <PopoverWrapper
        side="bottom"
        align="center"
        trigger={<Button>Bottom Center</Button>}
        content={<div className="text-sm">Bottom + Center</div>}
      />
      <PopoverWrapper
        side="left"
        align="end"
        trigger={<Button>Left End</Button>}
        content={<div className="text-sm">Left + End</div>}
      />
      <PopoverWrapper
        side="right"
        align="center"
        trigger={<Button>Right Center</Button>}
        content={<div className="text-sm">Right + Center</div>}
      />
    </div>
  ),
};

export const WithAnchor: Story = {
  render: () => (
    <PopoverWrapper
      withAnchor
      anchorEl={
        <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
      }
      trigger={<Button>Trigger</Button>}
      content={<div className="text-sm">Positioned relative to anchor</div>}
    />
  ),
};

export const WithFormContent: Story = {
  render: () => (
    <PopoverWrapper
      trigger={<Button>Open Form</Button>}
      content={
        <form className="space-y-2 w-64">
          <label className="text-sm font-medium">Name</label>
          <input className="input input-bordered w-full" placeholder="Enter name" />
          <Button type="submit" size="sm">
            Save
          </Button>
        </form>
      }
    />
  ),
};

export const OnDarkBackground: Story = {
  name: "Dark Mode Compatible",
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1e1e1e" }],
    },
  },
  render: () => (
    <PopoverWrapper
      trigger={<Button>Dark BG</Button>}
      content={<div className="text-sm text-white">Dark compatible ✨</div>}
    />
  ),
};

