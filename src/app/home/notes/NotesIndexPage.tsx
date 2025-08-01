'use client';

import React from 'react';
// import { useNoteStore } from '@/stores';
import { SearchableSortableNotes } from '@/components/notes/SearchableSortableNotes';
// import type { Note } from '@/schemas/resources/note-schema';
// import { useRouter } from 'next/navigation';
// import { NoteCard } from '@/components/notes';
// import { getExcerpt } from '@/utils/getExcerpt';

export default function NotesIndexPage() {
  // const router = useRouter();
  // const notesObj = useNoteStore((s) => s.items);
  // const notes = React.useMemo(() => Object.values(notesObj), [notesObj]);

  // const renderCard = React.useCallback(
  //   (note: Note) => (
  //     <div
  //       onClick={() => {
  //         router.push(`/home/notes/${note.id}`);
  //       }}
  //     >
  //       <NoteCard id={note.id} title={note.title} excerpt={getExcerpt(note)} />
  //     </div>
  //   ),
  //   [router]
  // );

  return (
    <div className="flex-1 min-h-0 p-4 flex flex-col">
      <SearchableSortableNotes />
    </div>
  );
}
