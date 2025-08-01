'use client';

import * as React from 'react';
import { useNoteStore } from '@/stores/resources/noteStore';
import { useNoteViewStore } from '@/stores/resources/noteViewStore/useNoteViewStore';
import { CombinedEditor, Note } from '@/schemas/resources';
import { NoteCard } from '@/components/notes/cards/NoteCard';
import { AddNoteCard } from '@/components/notes/cards/AddNoteCard';
import { MasonryVirtualWindow, CardItemBase } from '@/components/molecules/VirtualizedGrid/MasonryVirtualizedGrid';
import { useNotesSearchSort, NoteLike } from '@/hooks/notes/useNotesSearchSort/useNotesSearchSort';
import { SortKey, SortDir } from '@/components/atoms/controls';
import { useRouter } from 'next/navigation';
import { useMemo, useCallback } from 'react';
import { NotesControlsBar } from './NotesControlsBar';
import { aggregateViewContent, getViewExcerpts } from '@/utils';

interface NoteCardItem extends CardItemBase {
  title: string;
  excerpt: string;
}

export function SearchableSortableNotes() {
  const router = useRouter();
  const notesObj = useNoteStore((s) => s.items) as Record<string, Note & { id: string; tags?: string[] }>;
  const hasHydrated = useNoteStore((s) => s.hasHydrated);

  const allNotes: NoteLike[] = useMemo(() => {
    const activeByScope = useNoteViewStore.getState().activeByScope;
    const noteIds = Object.keys(notesObj);
    return noteIds.map((id) => {
      const n = notesObj[id];
      const active = activeByScope[id];
      const views = useNoteViewStore.getState().getViewsFor(id) as CombinedEditor[];
      return {
        id: n.id,
        title: n.title,
        excerpt: getViewExcerpts({ id: n.id, title: n.title, excerpt: '', content: '' }, active!, views),
        createdAt: n.createdAt,
        updatedAt: n.updatedAt,
        tags: n.tags || [],
        content: aggregateViewContent(n.id),
      };
    });
  }, [notesObj]);

  const {
    filtered,
    rawQuery,
    setRawQuery,
    isSearching,
    sortKey,
    setSortKey,
    sortDir,
    toggleSortDir,
    dateRange,
    setDateRange,
    selectedTags,
    setSelectedTags,
    resetAll,
  } = useNotesSearchSort(allNotes, {
    initialQuery: '',
    initialTags: [],
    initialDateRange: {},
    initialSortKey: 'updatedAt',
    initialSortDir: 'desc',
  });

  const items: NoteCardItem[] = useMemo(
    () =>
      filtered.map((n) => ({
        id: n.id,
        title: n.title?.trim() || 'Untitled',
        excerpt: n.excerpt || 'Start typing here...',
      })),
    [filtered]
  );

  const renderCard = useCallback(function RenderNoteCard(note: NoteCardItem) {
    return (
      <div
        key={note.id}
        onClick={() => {
          router.push(`/home/notes/${note.id}`);
        }}
      >
        <NoteCard id={note.id} title={note.title} excerpt={note.excerpt} />
      </div>
    );
  }, [router]);


  if (!hasHydrated) return null
  return (
    <div className="flex flex-col gap-4 min-h-0">
      <div className="flex flex-wrap gap-4 items-center">
        <NotesControlsBar
          searchTerm={rawQuery}
          onSearchChange={setRawQuery}
          sortKey={sortKey as SortKey}
          onSortKeyChange={(k) => setSortKey(k)}
          sortDir={sortDir as SortDir}
          toggleSortDir={toggleSortDir}
          dateFrom={dateRange.from}
          dateTo={dateRange.to}
          onDateRangeChange={({ from, to }) => setDateRange({ from, to })}
          clearAll={resetAll}
          isSearching={isSearching}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          allNotes={allNotes}
        />
      </div>

      <MasonryVirtualWindow<NoteCardItem>
        aria-label="Notes masonry"
        items={items}
        estimatedCardHeight={180}
        overscanScreens={1}
        renderAddNew={() => <AddNoteCard />}
        renderCard={(item) => renderCard(item)}
      />

      {filtered.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-6">
          No notes match your current filters.
        </div>
      )}
    </div>
  );
}
