import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RadioGroup, type RadioOption } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Atoms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "value changed" },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const baseOptions: RadioOption[] = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c", disabled: true },
];

const withDescriptions: RadioOption[] = [
  {
    label: "Beginner",
    value: "beginner",
    description: "For new users just getting started.",
  },
  {
    label: "Intermediate",
    value: "intermediate",
    description: "Some experience with the tool.",
  },
  {
    label: "Advanced",
    value: "advanced",
    description: "Expert-level users with full access.",
    disabled: true,
  },
];

export const Default: Story = {
  args: {
    options: baseOptions,
  },
};

export const WithDescriptions: Story = {
  args: {
    options: withDescriptions,
  },
};

export const Horizontal: Story = {
  args: {
    options: baseOptions,
    direction: "horizontal",
  },
};

export const WithCustomItemClass: Story = {
  args: {
    options: baseOptions,
    itemClassName: "border border-muted rounded-sm",
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("b");

    return (
      <div className="max-w-sm space-y-2">
        <RadioGroup options={baseOptions} value={value} onChange={setValue} />
        <p className="text-sm text-muted-foreground">Selected: {value}</p>
      </div>
    );
  },
};
