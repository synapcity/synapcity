import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { MinimalMeta } from "../../../molecules/cards/meta/MinimalMeta";
import { StackedMeta } from "../../../molecules/cards/meta/StackedMeta";
import { ProgressiveMeta } from "../../../molecules/cards/meta/ProgressiveMeta";


const now = new Date();
const fourHoursAgo = new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString();
const createdAtSample = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();


interface CardProps {
  title: string;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
  variant: "minimal" | "stacked" | "progressive";
}

const Card: React.FC<CardProps> = ({
  title,
  excerpt,
  createdAt,
  updatedAt,
  variant,
}) => {
  const MetaComponent =
    variant === "minimal"
      ? MinimalMeta
      : variant === "stacked"
        ? StackedMeta
        : ProgressiveMeta;

  return (
    <div
      style={{ width: 320 }}
      className="bg-(--background-200) text-(--foreground) rounded-2xl p-5 shadow-lg relative font-sans"
    >
      <div className="mb-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm line-clamp-2 mt-1">{excerpt}</p>
      </div>
      <div className="mt-auto">
        <MetaComponent createdAt={createdAt} updatedAt={updatedAt} />
      </div>
    </div>
  );
};

// --- Storybook definition ---

const meta: Meta<typeof Card> = {
  title: "Dashboard/Card / Metadata Variants",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["minimal", "stacked", "progressive"],
    },
    title: { control: "text" },
    excerpt: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Minimal: Story = {
  args: {
    title: "Personal Productivity",
    excerpt: "Daily planning, tasks, and time tracking widgets.",
    createdAt: new Date(new Date().getTime() - 24 * 3600 * 1000).toISOString(),
    updatedAt: fourHoursAgo,
    variant: "minimal",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Personal Productivity/i)).toBeInTheDocument();
    await expect(canvas.getByLabelText("last-updated")).toBeVisible();
  },
};

export const Stacked: Story = {
  args: {
    title: "Reading Tracker",
    excerpt: "Dashboard to track reading progress, books, and quotes.",
    createdAt: createdAtSample,
    updatedAt: fourHoursAgo,
    variant: "stacked",
  },
};

export const Progressive: Story = {
  args: {
    title: "Work Dashboard",
    excerpt: "Tracks projects, meeting notes, and OKRs.",
    createdAt: createdAtSample,
    updatedAt: fourHoursAgo,
    variant: "progressive",
  },
};
