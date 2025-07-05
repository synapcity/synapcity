import type { Meta, StoryObj } from "@storybook/react"
import { Drawer } from "./Drawer"
import { Button } from "@/components/atoms"
import React from "react"

const meta: Meta<typeof Drawer> = {
  title: "Molecules/Drawer",
  component: Drawer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Drawer>

const drawerBody = (
  <div>
    <p className="mb-2">Here is some drawer content.</p>
    <p>This can include forms, navigation, settings, or anything else.</p>
  </div>
)

const drawerFooter = (
  <div className="flex justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </div>
)

export const Default: Story = {
  args: {
    trigger: <Button>Open Drawer</Button>,
    title: "Default Drawer",
    description: "This is a default drawer from the right.",
    children: drawerBody,
    showTitle: true,
    showDescription: true,
  },
}

export const OpenOnLoad: Story = {
  args: {
    defaultOpen: true,
    title: "Always Open",
    description: "Useful for debugging or persistent UI.",
    children: drawerBody,
    showTitle: true,
    showDescription: true,
  },
}

export const WithFooterCloseButton: Story = {
  args: {
    trigger: <Button>Drawer with Footer</Button>,
    title: "Drawer with Footer",
    children: drawerBody,
    footer: drawerFooter,
    showFooterClose: true,
    showTitle: true,
  },
}

export const WithoutHeader: Story = {
  args: {
    trigger: <Button>No Header</Button>,
    children: drawerBody,
    showTitle: false,
    showDescription: false,
  },
}

export const TopSide: Story = {
  args: {
    trigger: <Button>Top Drawer</Button>,
    side: "top",
    title: "Top Positioned",
    description: "This drawer slides in from the top.",
    children: drawerBody,
    showTitle: true,
    showDescription: true,
  },
}

export const LeftSide: Story = {
  args: {
    trigger: <Button>Left Drawer</Button>,
    side: "left",
    title: "Left Positioned",
    description: "This drawer slides in from the left.",
    children: drawerBody,
    showTitle: true,
    showDescription: true,
  },
}

export const BottomSide: Story = {
  args: {
    trigger: <Button>Bottom Drawer</Button>,
    side: "bottom",
    title: "Bottom Positioned",
    description: "This drawer slides in from the bottom.",
    children: drawerBody,
    showTitle: true,
    showDescription: true,
  },
}

export const ControlledOpenState: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)

    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open Controlled Drawer</Button>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          title="Controlled Drawer"
          description="This drawer's state is controlled by the parent."
          showTitle
          showDescription
          children={drawerBody}
          footer={
            <div className="flex justify-end">
              <Button onClick={() => setOpen(false)} variant="outline">
                Close
              </Button>
            </div>
          }
        />
      </div>
    )
  },
}
