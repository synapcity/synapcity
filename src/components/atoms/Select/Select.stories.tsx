import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Select, SelectOption, GroupedSelectOption } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Atoms/Select",
  component: Select,
  args: {
    placeholder: "Select an option",
  },
  argTypes: {
    onValueChange: { action: "value changed" },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const baseOptions: SelectOption[] = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c", disabled: true },
];

const groupedOptions: GroupedSelectOption[] = [
  {
    label: "Group One",
    options: [
      { label: "Group A1", value: "a1" },
      { label: "Group A2", value: "a2" },
    ],
  },
  {
    label: "Group Two",
    options: [
      { label: "Group B1", value: "b1" },
      { label: "Group B2", value: "b2", disabled: true },
    ],
  },
];

export const Default: Story = {
  args: {
    label: "Choose an option",
    options: baseOptions,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Choose an option",
    description: "This is a helpful description",
    options: baseOptions,
  },
};

export const WithError: Story = {
  args: {
    label: "Choose an option",
    error: "Selection is required",
    options: baseOptions,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Select",
    disabled: true,
    options: baseOptions,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("b");

    return (
      <div className="max-w-xs">
        <Select
          label="Controlled Select"
          value={value}
          onValueChange={setValue}
          options={baseOptions}
        />
        <p className="mt-2 text-sm text-muted-foreground">Current: {value}</p>
      </div>
    );
  },
};

export const Grouped: Story = {
  args: {
    label: "Grouped Select",
    groupedOptions,
  },
};

export const SmallSize: Story = {
  args: {
    label: "Small Select",
    size: "sm",
    options: baseOptions,
  },
};
