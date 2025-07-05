import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DarkModeToggle } from "./DarkModeToggle";

const meta: Meta<typeof DarkModeToggle> = {
  title: "Atoms/DarkModeToggle",
  component: DarkModeToggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DarkModeToggle>;

export const Default: Story = {
  render: () => <DarkModeToggle />,
};

export const WithCustomClass: Story = {
  render: () => (
    <DarkModeToggle className="border-2 border-primary rounded-full shadow" />
  ),
};
