'use client';

import { useEffect, useMemo } from 'react';
import { useNoteStore } from '@/stores/resources/noteStore';
// import { Note } from '@/schemas/resources';
import { NoteCard } from '@/components/notes/cards/NoteCard';
import { AddNoteCard } from '@/components/notes/cards/AddNoteCard';
import { CardItemBase, MasonryVirtualWindow } from '@/components/molecules/VirtualizedGrid/MasonryVirtualizedGrid';
import { getExcerpt } from '@/utils/getExcerpt';
import { useShallow } from 'zustand/shallow';

// type NoteResource = Note & { id: string };

interface NoteCardItem extends CardItemBase {
  excerpt: string;
}

export function NotesMasonryGrid() {
  const notes = useNoteStore(useShallow(s => s.items))
  const hasHydrated = useNoteStore(s => s.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;
  }, [hasHydrated]);

  const items: NoteCardItem[] = useMemo(() => {
    return Object.values(notes).map(n => ({
      id: n.id,
      title: n.title.trim() || 'Untitled',
      excerpt: getExcerpt(n),
    }));
  }, [notes])

  return (
    <MasonryVirtualWindow<NoteCardItem>
      aria-label="Notes masonry"
      items={items}
      estimatedCardHeight={180}
      overscanScreens={1}
      renderAddNew={() => <AddNoteCard />}
      renderCard={item => (
        <NoteCard
          key={item.id}
          id={item.id}
          title={item.title ?? "Untitled"}
          excerpt={item.excerpt}
          onClick={item.onClick}
        />
      )}
    />
  );
}
