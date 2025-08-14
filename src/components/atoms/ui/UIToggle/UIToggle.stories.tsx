"use client";

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Toggle } from "./toggle";
import { Sun, Moon, Bell, BellOff, Check, X } from "lucide-react";

const variantOptions = ["soft", "solid", "outline", "ghost"] as const;
const toneOptions = ["neutral", "accent", "primary", "destructive"] as const;
const sizeOptions = ["sm", "md", "lg"] as const;
const shapeOptions = ["md", "pill"] as const;

const meta = {
  title: "Toggles/UIToggle",
  component: Toggle,
  parameters: {
    layout: "centered",
    controls: { expanded: true },
  },
  argTypes: {
    variant: { control: "select", options: variantOptions },
    tone: { control: "select", options: toneOptions },
    size: { control: "select", options: sizeOptions },
    shape: { control: "select", options: shapeOptions },
    elevated: { control: "boolean" },
    pressed: { control: "boolean" },
    onPressedChange: { action: "onPressedChange" },
    children: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, display: "grid", gap: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: <span className="px-2">Toggle</span>,
    variant: "soft",
    tone: "neutral",
    size: "md",
    shape: "md",
    elevated: true,
  },
};

export const IconOnly: Story = {
  args: {
    children: <Sun className="size-4" />,
    "aria-label": "Toggle theme",
    variant: "outline",
    tone: "accent",
    size: "md",
    shape: "pill",
  },
};

export const IconSwap: Story = {
  render: (args) => {
    const [pressed, setPressed] = useState(false);
    return (
      <Toggle
        {...args}
        pressed={pressed}
        onPressedChange={setPressed}
        aria-label={pressed ? "Switch to light" : "Switch to dark"}
      >
        {pressed ? <Moon className="size-4" /> : <Sun className="size-4" />}
      </Toggle>
    );
  },
  args: {
    variant: "outline",
    tone: "accent",
    size: "md",
    shape: "pill",
    elevated: true,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Toggle {...args} size="sm">
        <span className="px-2">Small</span>
      </Toggle>
      <Toggle {...args} size="md">
        <span className="px-2">Medium</span>
      </Toggle>
      <Toggle {...args} size="lg">
        <span className="px-3">Large</span>
      </Toggle>
    </div>
  ),
  args: {
    variant: "soft",
    tone: "neutral",
    shape: "md",
  },
};

export const Shapes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Toggle {...args} shape="md">
        <span className="px-3">Rounded</span>
      </Toggle>
      <Toggle {...args} shape="pill">
        <span className="px-4">Pill</span>
      </Toggle>
    </div>
  ),
  args: {
    variant: "soft",
    tone: "accent",
    size: "md",
  },
};

export const VariantsMatrix: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 gap-4">
      {variantOptions.map((v) => (
        <div key={v} className="flex items-center gap-3">
          <div className="w-24 text-xs text-muted-foreground">{v}</div>
          <Toggle {...args} variant={v} pressed>
            <span className="px-3">On</span>
          </Toggle>
          <Toggle {...args} variant={v}>
            <span className="px-3">Off</span>
          </Toggle>
        </div>
      ))}
    </div>
  ),
  args: {
    tone: "neutral",
    size: "md",
    shape: "md",
    elevated: true,
  },
};

export const TonesMatrix: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 gap-4">
      {toneOptions.map((t) => (
        <div key={t} className="flex items-center gap-3">
          <div className="w-24 text-xs text-muted-foreground">{t}</div>
          <Toggle {...args} tone={t} pressed>
            <span className="inline-flex items-center gap-2 px-3">
              <Check className="size-4" />
              <span>Active</span>
            </span>
          </Toggle>
          <Toggle {...args} tone={t}>
            <span className="inline-flex items-center gap-2 px-3">
              <X className="size-4" />
              <span>Inactive</span>
            </span>
          </Toggle>
        </div>
      ))}
    </div>
  ),
  args: {
    variant: "soft",
    size: "md",
    shape: "md",
    elevated: true,
  },
};

export const Elevation: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Toggle {...args} elevated>
        <span className="px-3">Elevated</span>
      </Toggle>
      <Toggle {...args} elevated={false}>
        <span className="px-3">Flat</span>
      </Toggle>
    </div>
  ),
  args: {
    variant: "soft",
    tone: "neutral",
    size: "md",
    shape: "md",
    pressed: true,
  },
};

export const DisabledAndInvalid: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle {...args} disabled pressed>
        <span className="px-3">On (disabled)</span>
      </Toggle>
      <Toggle {...args} disabled>
        <span className="px-3">Off (disabled)</span>
      </Toggle>
      <Toggle {...args} aria-invalid="true" pressed>
        <span className="px-3">On (invalid)</span>
      </Toggle>
      <Toggle {...args} aria-invalid="true">
        <span className="px-3">Off (invalid)</span>
      </Toggle>
    </div>
  ),
  args: {
    variant: "outline",
    tone: "neutral",
    size: "md",
    shape: "md",
  },
};

export const WithTextAndIcon: Story = {
  args: {
    children: (
      <span className="inline-flex items-center gap-2 px-3">
        <Bell className="size-4" />
        <span>Notifications</span>
      </span>
    ),
    variant: "solid",
    tone: "accent",
    size: "lg",
    shape: "pill",
    pressed: true,
  },
};

export const WithTextAndIconInactive: Story = {
  args: {
    children: (
      <span className="inline-flex items-center gap-2 px-3">
        <BellOff className="size-4" />
        <span>Notifications</span>
      </span>
    ),
    variant: "solid",
    tone: "accent",
    size: "lg",
    shape: "pill",
    pressed: false,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [pressed, setPressed] = useState<boolean>(true);
    return (
      <Toggle
        {...args}
        pressed={pressed}
        onPressedChange={(v) => {
          setPressed(v);
          args.onPressedChange?.(v);
        }}
      >
        <span className="px-3">{pressed ? "Controlled: On" : "Controlled: Off"}</span>
      </Toggle>
    );
  },
  args: {
    variant: "soft",
    tone: "neutral",
    size: "md",
    shape: "md",
    elevated: true,
  },
};
