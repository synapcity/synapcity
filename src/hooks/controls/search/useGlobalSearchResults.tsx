/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo } from "react";
import { useFuzzyFilter, UseFuzzyFilterOptions } from "./useFuzzyFilter";
import { useNoteStore } from "@/stores/resources/noteStore";
import { useDashboardStore } from "@/stores/dashboardStore/useDashboardStore";
import { useRouter } from "next/navigation";
import { FileText, LayoutDashboard } from "lucide-react";
import { useShallow } from "zustand/shallow";

export type CommandMenuItem = {
  label: string;
  shortcut?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
};

export type CommandMenuGroup = {
  heading: string;
  items: CommandMenuItem[];
};

const noteSearchOptions: UseFuzzyFilterOptions<any> = {
  keys: ["title", "summary", "tags", "content", "viewLabel"],
  threshold: 0.8,
  minQueryLength: 1,
  includeScore: true,
  includeMatches: true,
  ignoreLocation: true
};

const dashboardSearchOptions: UseFuzzyFilterOptions<any> = {
  keys: ["name", "description"],
  threshold: 0.6,
  minQueryLength: 1,
  includeMatches: true,
  includeScore: true,
  ignoreLocation: true
};

export function useGlobalSearchResults(query: string): CommandMenuGroup[] {
  const router = useRouter();
  const notesObj = useNoteStore(useShallow(s => s.items));
  const notes = useMemo(() => Object.values(notesObj), [notesObj])
  const dashboardsObj = useDashboardStore(useShallow(s => s.items))
  const dashboards = useMemo(() => Object.values(dashboardsObj), [dashboardsObj]);

  const filteredNotes = useFuzzyFilter(notes, query, noteSearchOptions);
  const filteredDashboards = useFuzzyFilter(dashboards, query, dashboardSearchOptions);

  return useMemo(() => {
    const groups: CommandMenuGroup[] = [];

    if (filteredNotes.length > 0) {
      groups.push({
        heading: "Notes",
        items: filteredNotes.map((note) => ({
          label: note.title || "Untitled Note",
          icon: <FileText className="mr-2 h-4 w-4 text-primary" />,
          shortcut: "N",
          onSelect: () => router.push(`/home/notes/${note.id}`),
        })),
      });
    }

    if (filteredDashboards.length > 0) {
      groups.push({
        heading: "Dashboards",
        items: filteredDashboards.map((db) => ({
          label: db.name,
          icon: <LayoutDashboard className="mr-2 h-4 w-4 text-accent" />,
          shortcut: "D",
          onSelect: () => router.push(`/home/dashboards/${db.id}`),
        })),
      });
    }

    if (groups.length === 0 && query.trim()) {
      groups.push({
        heading: "No Results",
        items: [
          {
            label: "No matching notes or dashboards.",
            disabled: true,
          },
        ],
      });
    }

    return groups;
  }, [filteredNotes, filteredDashboards, router, query]);
}
