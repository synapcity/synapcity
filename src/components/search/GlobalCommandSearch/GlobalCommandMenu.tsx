"use client";

import React, { useEffect } from "react";
import { CommandMenu, CommandMenuGroup } from "@/components/molecules/CommandMenu";
import { useDebouncedQuery, useGlobalSearchResults } from "@/hooks/controls/search";

export function GlobalCommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const {
    rawQuery,
    setRawQuery,
    query,
    isSearching,
    clear,
  } = useDebouncedQuery({ debounceMs: 250 });

  const groups: CommandMenuGroup[] = useGlobalSearchResults(query);

  useEffect(() => {
    if (!open) clear();
  }, [open, clear]);

  return (
    <CommandMenu
      open={open}
      onOpenChange={onOpenChange}
      groups={groups}
      searchPlaceholder="Search notes, dashboards…"
      searchValue={rawQuery}
      onSearchChange={setRawQuery}
      title="Global Search"
      description={isSearching ? "Searching…" : "Jump to anything (⌘K)"}
      showCloseButton
    />
  );
}
