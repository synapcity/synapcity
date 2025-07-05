import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Switch } from "./Switch"

const meta: Meta<typeof Switch> = {
  title: "Molecules/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    onCheckedChange: { action: "changed" },
    className: { control: false },
    id: { control: false },
  },
}

export default meta

type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    label: "Enable feature",
  },
}

export const WithDescription: Story = {
  args: {
    label: "Auto Save",
    description: "Automatically save changes after edits",
  },
}

export const WithError: Story = {
  args: {
    label: "Terms & Conditions",
    error: "You must accept the terms to continue",
  },
}

export const Checked: Story = {
  args: {
    label: "Dark Mode",
    checked: true,
    onCheckedChange: (checked) =>
      console.log("Dark Mode is now:", checked ? "on" : "off"),
  },
}

export const DefaultChecked: Story = {
  args: {
    label: "Beta Access",
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    label: "Cannot toggle this",
    disabled: true,
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(false)

    return (
      <Switch
        {...args}
        checked={value}
        onCheckedChange={(val) => {
          setValue(val)
          args.onCheckedChange?.(val)
        }}
      />
    )
  },
  args: {
    label: "Controlled toggle",
  },
}

export const Playground: Story = {
  args: {
    label: "Enable notifications",
    description: "You’ll receive an email when updates happen.",
    error: "",
    defaultChecked: false,
    disabled: false,
  },
}
