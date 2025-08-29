/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon, IconProps } from "./Icon";
import React from "react";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    source: {
      control: { type: "radio" },
      options: ["lucide", "iconify", "undefined"],
    },
    name: { control: "text" },
    size: { control: "number" },
    className: { control: "text" },
    label: { control: "text" },
    tooltip: { control: "text" },
  },
  args: {
    name: "alert",
    source: "lucide",
    size: 24,
    className: "text-primary-foreground",
    label: "Alert icon",
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Lucide: Story = {
  args: {
    name: "arrowRight",
    source: "lucide",
    label: "Arrow right",
  },
};

export const Iconify: Story = {
  args: {
    name: "mdi:home",
    source: "iconify",
    label: "Home icon",
  },
};

const CustomIcon = (props: any) => (
  <svg
    data-testid="custom-icon"
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);
export const CustomIconComponent: Story = {
  args: {
    icon: CustomIcon,
    size: 32,
    source: "undefined",
    label: "Custom circle icon",
  },
};

// Icon with tooltip
export const WithTooltip: Story = {
  args: {
    name: "info",
    source: "lucide",
    tooltip: "Information icon tooltip",
    label: "Info icon",
  },
};

// Icon without label or tooltip should be aria-hidden
export const NoLabelNoTooltip: Story = {
  args: {
    name: "settings",
    source: "lucide",
    label: "",
    tooltip: undefined,
  },
};

// Icon with fallback when name is invalid
export const FallbackIcon: Story = {
  args: {
    name: "NonExistentIcon",
    source: "lucide",
    label: "Fallback icon shown",
  },
};

// Icon with fallbackIcon prop override
export const CustomFallbackIcon: Story = {
  args: {
    name: "NonExistentIcon",
    source: "undefined",
    fallbackIcon: (
      <svg data-testid="custom-fallback" width="24" height="24" viewBox="0 0 24 24" fill="red">
        <rect width="24" height="24" />
      </svg>
    ),
    label: "Custom fallback icon",
  },
};

// Demonstrate all predefined sizes for Lucide
export const AllSizesLucide: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      {["xs", "sm", "md", "lg", "xl"].map((size) => (
        <div key={size} style={{ textAlign: "center" }}>
          <Icon
            name="star"
            size={size as IconProps["size"]}
            source="lucide"
            label={`Star ${size}`}
          />
          <div style={{ fontSize: 12 }}>{size}</div>
        </div>
      ))}
    </div>
  ),
};

// Demonstrate all predefined sizes for Iconify
export const AllSizesIconify: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      {["xs", "sm", "md", "lg", "xl"].map((size) => (
        <div key={size} style={{ textAlign: "center" }}>
          <Icon
            name="mdi:star"
            size={size as IconProps["size"]}
            source="iconify"
            label={`Star ${size}`}
          />
          <div style={{ fontSize: 12 }}>{size}</div>
        </div>
      ))}
    </div>
  ),
};

// Custom numeric sizes example
export const NumericSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      {[10, 18, 24, 36, 48].map((size) => (
        <Icon
          key={size}
          name="star"
          source="lucide"
          size={size}
          label={`Star size ${size}`}
          className="text-blue-600"
        />
      ))}
    </div>
  ),
};

// Icon with additional className for styling
export const ColoredIcon: Story = {
  args: {
    name: "checkCircle2",
    source: "lucide",
    size: 40,
    className: "text-green-600",
    label: "Check circle green",
  },
};
