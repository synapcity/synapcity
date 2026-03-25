import React from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { VersionAction } from "../types";

export const ACTIONS: VersionAction[] = [
  "create",
  "update",
  "delete",
  "undo",
  "redo",
  "reset",
  "restore",
];

export type VersionFilterBarProps = {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedAction: VersionAction | null;
  onActionChange: (val: VersionAction | null) => void;
  /** Optional stats for UI only */
  totalCount?: number;
  filteredCount?: number;
};

export const VersionFilterBar: React.FC<VersionFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedAction,
  onActionChange,
  totalCount,
  filteredCount,
}) => {
  const handleTabChange = (val: string) => {
    if (val === "all") {
      onActionChange(null);
    } else {
      onActionChange(val as VersionAction);
    }
  };

  const showCounts = typeof totalCount === "number" && typeof filteredCount === "number";

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <label className="sr-only" htmlFor="version-search">
          Search versions
        </label>
        <Input
          id="version-search"
          placeholder="Search by title, content, or entity id..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1"
        />
      </div>

      <div className="flex flex-col items-end gap-2">
        <Tabs
          value={selectedAction ?? "all"}
          onValueChange={handleTabChange}
          className="w-full md:w-auto"
        >
          <TabsList className="flex flex-wrap justify-end gap-1">
            <TabsTrigger value="all" className="text-xs">
              All
            </TabsTrigger>
            {ACTIONS.map((action) => (
              <TabsTrigger key={action} value={action} className="text-xs">
                {action}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {showCounts && (
          <p className="text-[0.7rem] text-muted-foreground">
            Showing <span className="font-semibold">{filteredCount}</span> of{" "}
            <span className="font-semibold">{totalCount}</span> versions
          </p>
        )}
      </div>
    </div>
  );
};
