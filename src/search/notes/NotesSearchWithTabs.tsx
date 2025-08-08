"use client";

import React, { useState, useDeferredValue, useMemo } from "react";
import { useNoteStore } from "@/stores/resources/noteStore/useNoteStore";
import { useNoteViewStore } from "@/stores/resources/noteViewStore/useNoteViewStore";
import { useNoteSearch } from "./useNoteSearch";
import { useViewSearch } from "./useViewSearch";
import { highlightMatches } from "@/search/highlightMatches";
import { BookOpenText, FileText } from "lucide-react";
import { useShallow } from "zustand/shallow";

export function NotesSearchWithTabs() {
  const noteMap = useNoteStore(useShallow((s) => s.items));
  const viewMap = useNoteViewStore(useShallow((s) => s.items));
  const hasHydrated = useNoteStore(s => s.hasHydrated)

  const notes = useMemo(() => Object.values(noteMap), [noteMap])
  const views = useMemo(() => Object.values(viewMap).filter(v => v.type === "editor"), [viewMap])

  const [query, setQuery] = React.useState("");
  const deferredQuery = useDeferredValue(query);

  const [tab, setTab] = useState<"notes" | "dashboards">("notes");
  const noteResults = useNoteSearch(notes, query);
  const viewResults = useViewSearch(views, query);

  const results = tab === "notes" ? [...noteResults, ...viewResults] : [];

  if (!hasHydrated) return null;
  return (
    <div className="bg-(--sidebar-background-100) text-(--sidebar-foreground) border rounded shadow-md p-4 flex-1 flex flex-col w-full">
      <div className="flex space-x-4 mb-3">
        <button
          className={`px-4 py-2 font-semibold rounded ${tab === "notes" ? "bg-(--accent-background) text-(--accent-foreground)" : "bg-(--sidebar-background) text-(--sidebar-background-200) hover:text-(--accent)"
            }`}
          onClick={() => setTab("notes")}
        >
          Notes
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded ${tab === "dashboards" ? "bg-(--accent-background) text-(--accent-foreground)" : "bg-(--sidebar-background) text-(--sidebar-background-200) hover:text-(--accent)"
            }`}
          onClick={() => setTab("dashboards")}
        >
          Dashboards
        </button>
      </div>
      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder={
          tab === "notes" ? "Search notes by title, tags…" : "Search dashboards…"
        }
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />
      {deferredQuery.length > 2 && results.length === 0 && (
        <div className="text-gray-400 px-2 py-4">No results found.</div>
      )}
      <ul>
        {results.filter(r => r.item).map(({ item, matches }) => {
          const isNote = item.entityType === "note";
          const url = isNote
            ? `/home/notes/${item.id}`
            : `/home/notes/${item.parentNoteId}?tab=${item.id}`;

          return (
            <li key={item.id}>
              <a
                href={url}
                className="flex items-start gap-3 py-2 px-1 rounded hover:bg-gray-100 no-underline group"
                tabIndex={0}
                aria-label={
                  isNote
                    ? `Go to note ${item.title}`
                    : `Go to tab ${item.viewLabel} in note ${noteMap[item.parentNoteId]?.title || ""}`
                }
              >
                {isNote ? (
                  <BookOpenText className="mt-1 w-4 h-4 text-indigo-500 opacity-80 group-hover:opacity-100" />
                ) : (
                  <FileText className="mt-1 w-4 h-4 text-orange-500 opacity-80 group-hover:opacity-100" />
                )}
                <div className="flex-1 min-w-0">
                  {isNote ? (
                    <>
                      <div className="font-bold truncate">
                        {highlightMatches(item.title, matches?.filter(m => m.key === "title"))}
                      </div>
                      {item.tags && (item.tags || []).length > 0 && (
                        <div className="text-xs text-gray-500 truncate">{item.tags?.join(", ")}</div>
                      )}
                      {item.summary && (
                        <div className="text-xs text-gray-400 truncate">
                          {highlightMatches(item.summary, matches?.filter(m => m.key === "summary"))}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="font-bold truncate">
                        {noteMap[item.parentNoteId] && (
                          <span className="text-indigo-500">{noteMap[item.parentNoteId].title}</span>
                        )}
                        <span className="mx-2 text-gray-300">/</span>
                        <span className="italic">
                          {highlightMatches(item.viewLabel, matches?.filter(m => m.key === "viewLabel"))}
                        </span>
                      </div>
                      {item.content && (
                        <div className="text-xs text-gray-500 truncate">
                          {highlightMatches(item.content, matches?.filter(m => m.key === "content"))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
