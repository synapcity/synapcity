"use client"

import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchableMultiSelect, SearchableMultiSelectOption } from "./SearchableMultiSelect";
import { BookOpen, Code, PenTool } from "lucide-react";

const meta: Meta<typeof SearchableMultiSelect> = {
  title: "Molecules/SearchableMultiSelect",
  component: SearchableMultiSelect,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SearchableMultiSelect>;

const STATIC_OPTIONS: SearchableMultiSelectOption[] = [
  { label: "React", value: "react" },
  { label: "TypeScript", value: "ts" },
  { label: "Node.js", value: "node" },
  { label: "Python", value: "python" },
  { label: "Ruby", value: "ruby", disabled: true },
];

function Template(args: Partial<React.ComponentProps<typeof SearchableMultiSelect>>) {
  const [value, setValue] = useState<string[]>(args.value || []);

  return (
    <div className="w-full max-w-sm">
      <SearchableMultiSelect
        {...args}
        value={value}
        onChange={(v) => {
          setValue(v);
          args.onChange?.(v);
        }}
      />
    </div>
  );
}

export const Default: Story = {
  render: () =>
    Template({
      options: STATIC_OPTIONS,
    }),
};

export const WithPreselected: Story = {
  render: () =>
    Template({
      options: STATIC_OPTIONS,
      value: ["react"],
    }),
};

export const WithMaxSelected: Story = {
  render: () =>
    Template({
      options: STATIC_OPTIONS,
      maxSelected: 2,
    }),
};

export const TagsBelowWithClear: Story = {
  render: () =>
    Template({
      options: STATIC_OPTIONS,
      value: ["react", "ts"],
      renderTagsBelow: true,
      showClearButton: true,
    }),
};

export const CustomIconsAndColors: Story = {
  render: () =>
    Template({
      options: STATIC_OPTIONS,
      value: ["react", "ts"],
      renderTagsBelow: true,
      getTagIcon: (val) =>
        val === "react" ? <Code size={14} /> : val === "ts" ? <PenTool size={14} /> : <BookOpen size={14} />,
      getTagColor: (val) =>
        val === "react" ? "#e5f0ff" : val === "ts" ? "#fdf6b2" : "#e2e8f0",
    }),
};

export const WithAsyncSearch: Story = {
  render: () =>
    Template({
      onSearch: async (query) => {
        return STATIC_OPTIONS.filter((opt) =>
          opt.label.toLowerCase().includes(query.toLowerCase())
        );
      },
      placeholder: "Search tech tags...",
    }),
};

export const WithCreateOption: Story = {
  render: () =>
    Template({
      options: STATIC_OPTIONS,
      onCreateOption: (label) => {
        alert(`Create option: ${label}`);
      },
    }),
};
