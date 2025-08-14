"use client";

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BaseToggle, type BaseToggleProps } from "./BaseToggle";
import { Sun, Moon, Bell, BellOff, Check, X } from "lucide-react";

// ---- Meta ----
const meta = {
  title: "Toggles/BaseToggle",
  component: BaseToggle,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "app",
      values: [
        { name: "app", value: "var(--background, #ffffff)" },
        { name: "muted", value: "hsl(210 16% 96%)" },
        { name: "dark", value: "#0b0b0b" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, display: "grid", gap: 12 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onChange: { action: "changed" }, // built-in actions (no addon needed)
    inactiveChildren: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof BaseToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---- Helpers ----
const TextChip = ({ label }: { label: string }) => <span className="px-2">{label}</span>;

// If your UIToggle supports 'variant' | 'size' props, you can surface them here.
// Adjust the options to match your actual Toggle props.
const variantOptions = ["default", "outline", "ghost"] as const;
const sizeOptions = ["default", "sm", "lg"] as const;

// ---- Stories ----

// 1) simplest text toggle
export const Default: Story = {
  control: {
    size: sizeOptions,
    variant: variantOptions,
  },
  args: {
    children: <TextChip label="Toggle" />,
    inactiveChildren: <TextChip label="Toggle" />,
    variant: "outline",
    size: sizeOptions[0],
    initialPressed: false,
  } satisfies BaseToggleProps,
};

// 2) icon-only (with accessible labels)
export const WithIcons: Story = {
  args: {
    children: <Sun className="size-4" />,
    inactiveChildren: <Moon className="size-4" />,
    variant: "outline",
    size: "default",
    activeLabel: "Switch to light",
    inactiveLabel: "Switch to dark",
    initialPressed: false,
  } satisfies BaseToggleProps,
};

// 3) text + icon chips
export const WithTextAndIcon: Story = {
  args: {
    children: (
      <span className="inline-flex items-center gap-2">
        <Bell className="size-4" />
        <span>Notifications</span>
      </span>
    ),
    inactiveChildren: (
      <span className="inline-flex items-center gap-2">
        <BellOff className="size-4" />
        <span>Notifications</span>
      </span>
    ),
    variant: "default",
    size: "lg",
    initialPressed: true,
  } satisfies BaseToggleProps,
};

// 4) initially pressed
export const InitiallyPressed: Story = {
  args: {
    children: <TextChip label="Pressed" />,
    inactiveChildren: <TextChip label="Not Pressed" />,
    variant: "outline",
    size: "default",
    initialPressed: true,
  } satisfies BaseToggleProps,
};

// 5) controlled example (syncs external state)
export const Controlled: Story = {
  render: (args) => {
    const [pressed, setPressed] = useState<boolean>(true);
    return (
      <BaseToggle
        {...args}
        pressed={pressed}
        onChange={(v) => {
          setPressed(v);
          args.onChange?.(v);
        }}
      />
    );
  },
  args: {
    children: <TextChip label="Controlled" />,
    inactiveChildren: <TextChip label="Controlled" />,
    variant: "outline",
    size: "default",
    activeLabel: "On",
    inactiveLabel: "Off",
  } satisfies BaseToggleProps,
};

// 6) sizes gallery
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <BaseToggle {...args} size="sm">
        <TextChip label="Small" />
      </BaseToggle>
      <BaseToggle {...args} size="default">
        <TextChip label="Default" />
      </BaseToggle>
      <BaseToggle {...args} size="lg">
        <TextChip label="Large" />
      </BaseToggle>
    </div>
  ),
  args: {
    variant: "outline",
    initialPressed: false,
    inactiveChildren: <TextChip label="" />,
  } satisfies Partial<BaseToggleProps>,
};

// 7) variants gallery (adjust options to match your Toggle)
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-8">
      {variantOptions.map((v) => (
        <div key={v} className="flex items-center gap-3">
          <div className="text-xs text-muted-foreground w-16">{v}</div>
          <BaseToggle {...args} variant={v}>
            <TextChip label="On" />
          </BaseToggle>
          <BaseToggle {...args} variant={v} initialPressed={false}>
            <TextChip label="Off" />
          </BaseToggle>
        </div>
      ))}
    </div>
  ),
  args: {
    size: "default",
    inactiveChildren: <TextChip label="Off" />,
    initialPressed: true,
  } satisfies Partial<BaseToggleProps>,
};

// 8) disabled states
export const DisabledStates: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <BaseToggle {...args} disabled initialPressed>
        <TextChip label="On (disabled)" />
      </BaseToggle>
      <BaseToggle {...args} disabled initialPressed={false}>
        <TextChip label="Off (disabled)" />
      </BaseToggle>
    </div>
  ),
  args: {
    variant: "outline",
    size: "default",
    inactiveChildren: <TextChip label="" />,
  } satisfies Partial<BaseToggleProps>,
};

// 9) segmented group (3 buttons)
export const SegmentedGroup: Story = {
  render: () => {
    const [value, setValue] = useState<"left" | "center" | "right">("center");
    const btn = (id: typeof value, label: string) => (
      <BaseToggle
        key={id}
        variant="ghost"
        size="sm"
        className="rounded-full"
        pressed={value === id}
        onChange={(p) => p && setValue(id)}
        activeLabel={`${label} selected`}
        inactiveLabel={label}
      >
        <span className="px-3">{label}</span>
      </BaseToggle>
    );
    return (
      <div className="inline-flex items-center rounded-full border border-border bg-muted/40 p-1">
        {btn("left", "Left")}
        {btn("center", "Center")}
        {btn("right", "Right")}
      </div>
    );
  },
};

// 10) success / danger look using child content classes
export const SemanticLooks: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <BaseToggle
        {...args}
        variant="default"
        initialPressed
        inactiveChildren={
          <span className="inline-flex items-center gap-2">
            <X className="size-4" />
            <span>Inactive</span>
          </span>
        }
      >
        <span className="inline-flex items-center gap-2">
          <Check className="size-4" />
          <span>Active</span>
        </span>
      </BaseToggle>

      <BaseToggle
        {...args}
        variant="outline"
        inactiveClasses="opacity-70"
        initialPressed={false}
        inactiveChildren={<TextChip label="Muted Off" />}
      >
        <TextChip label="On" />
      </BaseToggle>
    </div>
  ),
  args: {
    size: "default",
  },
};
