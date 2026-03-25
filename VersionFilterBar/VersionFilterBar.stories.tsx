import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { VersionFilterBar } from "./VersionFilterBar";
import type { VersionAction } from "../types";
import { mockVersionEntries } from "../mockHistory";

const meta: Meta<typeof VersionFilterBar> = {
  title: "Versioning/VersionFilterBar",
  component: VersionFilterBar,
};

export default meta;

type Story = StoryObj<typeof VersionFilterBar>;

export const Default: Story = {
  render: () => {
    const [search, setSearch] = useState("");
    const [action, setAction] = useState<VersionAction | null>(null);
    const total = mockVersionEntries.length;
    const filtered = mockVersionEntries.filter((entry) => {
      const matchesAction = action ? entry.action === action : true;
      const haystack = JSON.stringify(entry.entityState).toLowerCase();
      const needle = search.toLowerCase().trim();
      const matchesSearch = needle ? haystack.includes(needle) : true;
      return matchesAction && matchesSearch;
    }).length;

    return (
      <div className="space-y-4">
        <VersionFilterBar
          searchTerm={search}
          onSearchChange={setSearch}
          selectedAction={action}
          onActionChange={setAction}
          totalCount={total}
          filteredCount={filtered}
        />
        <pre className="text-xs text-muted-foreground bg-muted/40 p-2 rounded-md">
          <code>{JSON.stringify({ search, action, total, filtered }, null, 2)}</code>
        </pre>
      </div>
    );
  },
};
