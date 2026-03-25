/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { DiffViewerWithFilters } from "./DiffViewerWithFilters";
import type { VersionEntry } from "../VersionTimeline";
import { mockVersionEntries } from "../mockHistory";

const meta: Meta<typeof DiffViewerWithFilters> = {
  title: "Versioning/DiffViewerWithFilters",
  component: DiffViewerWithFilters,
};

export default meta;

type Story = StoryObj<typeof DiffViewerWithFilters>;

const entries: VersionEntry<any>[] = mockVersionEntries;

export const Default: Story = {
  render: () => <DiffViewerWithFilters entries={entries} />,
};
