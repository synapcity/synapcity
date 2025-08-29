"use client";

import { useState, useMemo, useDeferredValue } from "react";
import Link from "next/link";
import { useNoteStore } from "@/stores/resources/noteStore/useNoteStore";
import { useNoteViewStore } from "@/stores/resources/noteViewStore/useNoteViewStore";
import { useNotesWithViewsSearch } from "@/search/notes/useNotesWithViewsSearch";
import { highlightMatches } from "@/search/highlightMatches";
import { BookOpenText, FileText } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { CombinedEditor, Note } from "@/stores";

export function getNoteUrl(noteId: string, tabId?: string) {
  let url = `/home/notes/${noteId}`;
  if (tabId) url += `?tab=${tabId}`;
  return url;
}

export function NotesWithViewsSearch() {
  const noteMap = useNoteStore(useShallow((s) => s.items));
  const notes: Note[] = useMemo(() => Object.values(noteMap), [noteMap]);
  const viewObj = useNoteViewStore(useShallow((s) => s.items));
  const views: CombinedEditor[] = useMemo(() => Object.values(viewObj), [viewObj]).filter(
    (v) => v.type === "editor"
  );
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const results = useNotesWithViewsSearch(notes, views, deferredQuery);

  return (
    <div className="max-w-xl mx-auto bg-white border rounded shadow-md p-4">
      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Search all notes & tabs…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />
      {query && results.length === 0 && (
        <div className="text-gray-400 px-2 py-4">No results found.</div>
      )}
      <ul>
        {results.map(({ item, matches }) => {
          const isNote = item.entityType === "note";
          const url = isNote ? getNoteUrl(item.id) : getNoteUrl(item.parentNoteId, item.id);

          return (
            <li key={item.id}>
              <Link
                href={url}
                className="flex items-start gap-3 py-2 px-1 rounded transition hover:bg-gray-100 no-underline group"
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
                        {highlightMatches(
                          item.title,
                          matches?.filter((m) => m.key === "title")
                        )}
                      </div>
                      {(item.tags || [])?.length > 0 && (
                        <div className="text-xs text-gray-500 truncate">
                          {item.tags?.join(", ")}
                        </div>
                      )}
                      {item.summary && (
                        <div className="text-xs text-gray-400 truncate">
                          {highlightMatches(
                            item.summary,
                            matches?.filter((m) => m.key === "summary")
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="font-bold truncate">
                        {noteMap[item.parentNoteId] && (
                          <span className="text-indigo-500">
                            {noteMap[item.parentNoteId].title}
                          </span>
                        )}
                        <span className="mx-2 text-gray-300">/</span>
                        <span className="italic">
                          {highlightMatches(
                            item.viewLabel,
                            matches?.filter((m) => m.key === "viewLabel")
                          )}
                        </span>
                      </div>
                      {item.content && (
                        <div className="text-xs text-gray-500 truncate">
                          {highlightMatches(
                            item.content,
                            matches?.filter((m) => m.key === "content")
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
