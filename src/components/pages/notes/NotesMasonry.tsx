'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useNotesStore } from '@/stores/notesStore';
import { Note as NoteType } from "@/types/note";
import { NoteCard } from './NoteCard';

export function NotesMasonry() {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const notes = useNotesStore((s) => s.getAllNotes);
  const addNote = useNotesStore((s) => s.addItem);

  const createNote = async () => {
    setCreating(true);
    const newNote = await addNote({ title: "", summary: '', preview: "" });
    router.push(`/notes/${newNote.id}`);
  };

  return (
    <div className="relative h-screen overflow-y-auto bg-gray-900 p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-gray-900 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-900 to-transparent" />

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        <article
          onClick={createNote}
          className={`
            cursor-pointer break-inside-avoid
            flex flex-col items-center justify-center
            bg-gray-800 hover:bg-gray-700
            text-gray-400 hover:text-gray-200
            rounded-2xl p-5 mb-4 transition
            ${creating ? 'opacity-50 pointer-events-none' : ''}
          `}
        >
          <PlusCircle className="w-8 h-8" />
          <span className="mt-2 text-lg font-medium">
            {creating ? 'Creating…' : 'New Note'}
          </span>
        </article>

        {/* Existing notes */}
        {notes().map((note: NoteType) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title || 'Untitled'}
            excerpt={
              note.preview?.split(' ')
                .slice(0, 20)
                .join(' ')
                .concat('…') ?? ""
            }
            onClick={() => router.push(`/notes/${note.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
