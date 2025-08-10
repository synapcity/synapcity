"use client";

import { cn } from "@/utils";
import { ChevronDown } from "lucide-react";
import React from "react";
import { SortDir } from "./SortControl";

interface SortDirectionToggleProps {
  dir: SortDir;
  onToggle: () => void;
}

export function SortDirectionToggle({ dir, onToggle }: SortDirectionToggleProps) {
  return (
    <button
      aria-label={`Sort direction: ${dir === "asc" ? "ascending" : "descending"}. Toggle to ${dir === "asc" ? "descending" : "ascending"}.`}
      aria-pressed={dir === "asc"}
      onClick={onToggle}
      className="p-1 flex items-center"
      type="button"
    >
      <ChevronDown
        className={cn("transition-transform", dir === "asc" ? "rotate-180" : "rotate-0")}
        size={16}
      />
    </button>
  );
}
