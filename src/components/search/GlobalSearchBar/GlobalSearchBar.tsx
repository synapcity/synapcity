"use client";

import React, { useState, useMemo } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/atoms/ui/command";
import { SearchItem } from "@/theme/types/search";

type GlobalSearchBarProps = {
  items: SearchItem[];
  placeholder?: string;
};

export function GlobalSearchBar({ items, placeholder = "Search..." }: GlobalSearchBarProps) {
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const lowerQuery = query.toLowerCase();

    const grouped = {
      note: [] as SearchItem[],
      tag: [] as SearchItem[],
      user: [] as SearchItem[],
    };

    for (const item of items) {
      if (item.label.toLowerCase().includes(lowerQuery)) {
        grouped[item.type].push(item);
      }
    }

    return grouped;
  }, [query, items]);

  return (
    <div className="relative w-full max-w-xl">
      <Command className="border rounded-md shadow-sm bg-background">
        <CommandInput placeholder={placeholder} value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {Object.entries(filteredGroups).map(([type, group]) => {
            if (group.length === 0) return null;

            return (
              <CommandGroup
                key={type}
                heading={type === "note" ? "Notes" : type === "tag" ? "Tags" : "Users"}
              >
                {group.map((item) => (
                  <CommandItem key={item.id} onSelect={item.onSelect}>
                    {item.icon}
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </Command>
    </div>
  );
}
