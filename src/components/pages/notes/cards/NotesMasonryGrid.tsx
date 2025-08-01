'use client';

import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/stores/resources/noteStore';
import { NoteResource } from "@/types";
import { NoteCard } from './NoteCard';
import { useNoteViewStore } from '@/stores/resources/noteViewStore/useNoteViewStore';
import { CombinedEditor, Note } from '@/schemas/resources';
import { AddNoteCard } from './AddNoteCard';
import { useEffect } from 'react';



export function NotesMasonryGrid() {
  const router = useRouter();
  const notes = useNoteStore(s => s.items)
  const hasHydrated = useNoteStore(s => s.hasHydrated)

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

  }, [hasHydrated])

  const getExcerpt = (note: NoteResource) => {
    const activeId = useNoteViewStore.getState().activeByScope[note.id]
    const views = useNoteViewStore.getState().getViewsFor(note.id) as CombinedEditor[]
    const view = views.find((item: CombinedEditor) => item.id === activeId)
    if (view) {
      return (view as CombinedEditor).content
    } else {
      return "Start typing here..."
    }
  }

  return (
    <div className="relative h-full overflow-y-auto bg-gray-900 p-12">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        <AddNoteCard />
        {Object.values(notes).map((note: Note) => {
          const excerpt = getExcerpt(note)
          return (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title.trim() ?? 'Untitled'}
              excerpt={excerpt.trim() ?? ""}
              onClick={() => router.push(`/notes/${note.id}`)}
            />
          )

        }
        )}
      </div>
    </div>
  )
}
