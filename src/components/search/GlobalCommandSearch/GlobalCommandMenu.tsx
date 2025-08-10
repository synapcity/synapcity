/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useCallback } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  CommandGroup,
  CommandSubItem,
} from "@/components/atoms/ui/command";
import { useCommandMenuStore } from "@/stores/commandMenuStore";
import { useNoteStore } from "@/stores/resources/noteStore/useNoteStore";
import { useNoteViewStore } from "@/stores/resources/noteViewStore/useNoteViewStore";
import { highlightMatches } from "@/search/highlightMatches";
import { useCachedFuseSearch } from "@/hooks/useCachedFuseSearch";
import { noteSearchOptions, viewSearchOptions } from "@/search/notes/noteSearchOptions";
import { BookOpenText, FileText, Pin, PinOff } from "lucide-react";
import { Icon } from "@/components/atoms";
import { useShallow } from "zustand/shallow";
import { NoteSearchResult, prepareNotes, prepareViews, SearchableNoteItem } from "@/search/notes";
import { FuseResultMatch } from "fuse.js";

const PAGE_LIMIT = 15;

function getItemDisplayLabel(item: any) {
  return item.title || item.label || "Untitled";
}
function getItemIcon(item: any) {
  return item.icon || "note";
}
function getItemRoute(item: any) {
  // View: has parentNoteId and no title (as in your preparedViews)
  if ("parentNoteId" in item && !("title" in item)) {
    return `/home/notes/${item.parentNoteId}?tab=${item.id}`;
  }
  return `/home/notes/${item.id}`;
}

function NoteResult({
  note,
  matches,
  relatedViews,
  onNavigate,
  onPin,
  pinned,
}: {
  note: SearchableNoteItem;
  matches?: readonly FuseResultMatch[];
  relatedViews: NoteSearchResult[];
  onNavigate: (url: string) => void;
  onPin: (id: string) => void;
  pinned: boolean;
}) {
  return (
    <>
      <CommandItem onSelect={() => onNavigate(`/home/notes/${note.id}`)}>
        <BookOpenText className="mr-2 mt-1 w-4 h-4 opacity-80" />
        <div className="flex-1 min-w-0">
          <div className="font-bold truncate">
            {highlightMatches(
              note.title,
              matches?.filter((m) => m.key === "title")
            )}
          </div>
          {note.summary && (
            <div className="text-xs text-gray-400 truncate">
              {highlightMatches(
                note.summary,
                matches?.filter((m) => m.key === "summary")
              )}
            </div>
          )}
        </div>
        <button
          className="ml-2 p-1 text-muted-foreground hover:text-primary"
          aria-label={pinned ? "Unpin" : "Pin"}
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation();
            onPin(note.id);
          }}
        >
          {pinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
        </button>
      </CommandItem>
      {relatedViews.length > 0 &&
        relatedViews.map(({ item: view, matches }, idx) => (
          <CommandSubItem
            key={`view-result-${view.id}-${idx}`}
            className="pl-8"
            onSelect={() => onNavigate(`/home/notes/${note.id}?tab=${view.id}`)}
          >
            <FileText className="mr-2 mt-1 w-4 h-4 opacity-80" />
            <div className="flex-1 min-w-0">
              <div className="font-bold truncate">
                <span className="text-indigo-500">{note.title}</span>
                <span className="mx-2 text-gray-300">/</span>
                <span className="italic">
                  {highlightMatches(
                    view.viewLabel,
                    matches?.filter((m) => m.key === "viewLabel")
                  )}
                </span>
              </div>
              {view.content && (
                <div className="text-xs text-gray-500 truncate">
                  {highlightMatches(
                    view.content,
                    matches?.filter((m) => m.key === "content")
                  )}
                </div>
              )}
            </div>
          </CommandSubItem>
        ))}
    </>
  );
}

export function GlobalCommandMenu() {
  const {
    open,
    setOpen,
    rawQuery,
    setRawQuery,
    clearQuery,
    page,
    setPage,
    recents,
    addRecent,
    pins,
    pin,
    unpin,
    isPinned,
  } = useCommandMenuStore();

  const noteMap = useNoteStore(useShallow((s) => s.items));
  const viewMap = useNoteViewStore(useShallow((s) => s.items));
  const hasHydrated = useNoteStore((s) => s.hasHydrated);

  // Data
  const notesArr = useMemo(() => Object.values(noteMap), [noteMap]) ?? [];
  const viewsArr =
    useMemo(() => Object.values(viewMap).filter((v) => v.type === "editor"), [viewMap]) ?? [];

  const notes = prepareNotes(notesArr);
  const views = prepareViews(viewsArr);
  // Fuse search, paginated
  const noteResults = useCachedFuseSearch(notes, rawQuery, noteSearchOptions, PAGE_LIMIT * page);
  const viewResults = useCachedFuseSearch(views, rawQuery, viewSearchOptions, PAGE_LIMIT * page);

  // Related views
  const relatedViewsMap = useMemo(() => {
    const map: Record<string, typeof viewResults> = {};
    for (const res of viewResults) {
      const parentNoteId = res.item.parentNoteId;
      if (!parentNoteId) continue;
      if (!map[parentNoteId]) map[parentNoteId] = [];
      map[parentNoteId].push(res);
    }
    return map;
  }, [viewResults]);

  // Recents and pins as items
  const recentsItems = useMemo(
    () => recents.map((id) => noteMap[id] || viewMap[id]).filter(Boolean),
    [recents, noteMap, viewMap]
  );
  const pinsItems = useMemo(
    () => pins.map((id) => noteMap[id] || viewMap[id]).filter(Boolean),
    [pins, noteMap, viewMap]
  );

  // Handler for select: update recents
  const handleNavigate = useCallback(
    (url: string, id: string) => {
      window.location.assign(url);
      setOpen(false);
      addRecent(id);
    },
    [setOpen, addRecent]
  );

  // Pagination logic
  const showMore = noteResults?.length + viewResults?.length > PAGE_LIMIT * page;
  const pagedNoteResults = noteResults?.slice((page - 1) * PAGE_LIMIT, page * PAGE_LIMIT);

  // Reset page/query on close
  useEffect(() => {
    if (!open) {
      clearQuery();
      setPage(1);
    }
  }, [open, clearQuery, setPage]);

  if (!hasHydrated) return null;

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Global Search"
      description={
        rawQuery.trim() === "" ? "Jump to notes, views, and more…" : "Search your workspace"
      }
      showCloseButton
      shouldFilter={false}
    >
      <CommandInput
        data-testid="command-input"
        placeholder="Search notes or views…"
        value={rawQuery}
        onValueChange={setRawQuery}
        autoFocus
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Pinned Section */}
        {pinsItems.length > 0 && (
          <CommandGroup heading="Pinned">
            {pinsItems.map((item) => (
              <CommandItem
                key={`pinned-${"parentNoteId" in item && !("title" in item) ? "view" : "note"}-${item.id}`}
                onSelect={() => handleNavigate(getItemRoute(item), item.id)}
              >
                <Pin className="mr-2 w-4 h-4 text-primary" />
                {getItemDisplayLabel(item)}
                <button
                  className="ml-auto"
                  tabIndex={-1}
                  aria-label="Unpin"
                  onClick={(e) => {
                    e.stopPropagation();
                    unpin(item.id);
                  }}
                >
                  <PinOff className="w-4 h-4 text-muted-foreground" />
                </button>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Recent Section */}
        {recentsItems.length > 0 && (
          <CommandGroup heading="Recent">
            {recentsItems.map((item) => (
              <CommandItem
                key={`pinned-${"parentNoteId" in item && !("title" in item) ? "view" : "note"}-${item.id}`}
                onSelect={() => handleNavigate(getItemRoute(item), item.id)}
              >
                <Icon name={getItemIcon(item)} className="mr-2" />
                {getItemDisplayLabel(item)}
                <button
                  className="ml-auto"
                  tabIndex={-1}
                  aria-label={isPinned(item.id) ? "Unpin" : "Pin"}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isPinned(item.id)) {
                      unpin(item.id);
                    } else {
                      pin(item.id);
                    }
                  }}
                >
                  {isPinned(item.id) ? (
                    <PinOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Pin className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Notes (Paginated) */}
        <CommandGroup heading="Notes">
          {pagedNoteResults.map(({ item: note, matches }) => (
            <NoteResult
              key={note.id}
              note={note}
              matches={matches}
              relatedViews={relatedViewsMap[note.id] ?? []}
              onNavigate={(url) => handleNavigate(url, note.id)}
              onPin={isPinned(note.id) ? unpin : pin}
              pinned={isPinned(note.id)}
            />
          ))}
        </CommandGroup>
        {/* Pagination */}
        {showMore && (
          <CommandItem
            onSelect={() => setPage(page + 1)}
            className="justify-center text-primary hover:bg-accent-100"
          >
            Show more…
          </CommandItem>
        )}
      </CommandList>
    </CommandDialog>
  );
}
