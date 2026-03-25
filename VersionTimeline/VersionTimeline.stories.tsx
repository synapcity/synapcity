/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { VersionTimeline } from "./VersionTimeline";
import type { VersionEntry } from "./VersionTimeline";
import { mockVersionEntries } from "../mockHistory";

const meta: Meta<typeof VersionTimeline> = {
  title: "Versioning/VersionTimeline",
  component: VersionTimeline,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof VersionTimeline>;

const entries: VersionEntry<any>[] = mockVersionEntries;

export const TimelineWithModal: Story = {
  render: () => <VersionTimeline entries={entries} />,
};
