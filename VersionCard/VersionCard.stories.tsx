import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { VersionCard } from "./VersionCard";
import type { VersionEntry } from "../types";
import { mockVersionEntries } from "../mockHistory";

const meta: Meta<typeof VersionCard> = {
  title: "Versioning/VersionCard",
  component: VersionCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof VersionCard>;

const sampleEntry: VersionEntry<any> = mockVersionEntries[mockVersionEntries.length - 1];

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl">
      <VersionCard entry={sampleEntry} />
    </div>
  ),
};
