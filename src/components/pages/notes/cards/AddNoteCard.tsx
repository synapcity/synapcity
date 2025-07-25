"use client"

import { useNoteViewStore } from "@/stores/resources/noteViewStore";
import { useNoteStore } from "@/stores/resources/noteStore";
import { NoteResource } from "@/types";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils";

export const AddNoteCard = () => {
  const router = useRouter();
  const creating = useNoteStore((s) => s.status.isCreating);
  const addNote = useNoteStore((s) => s.addResourceWithDefaultView);
  const startStatus = useNoteStore((s) => s.startStatus);
  const finishStatus = useNoteStore((s) => s.finishStatus);
  const failStatus = useNoteStore((s) => s.failStatus);

  const createNote = async () => {
    startStatus("creating");
    let newNote = null;

    try {
      newNote = await addNote({ title: "", summary: "", preview: "" });
    } catch (err) {
      failStatus("creating", err as Error);
      return;
    } finally {
      finishStatus("creating");
    }

    if (newNote) {
      router.push(`/notes/${(newNote as NoteResource).id}`);
    }
  };

  return (
    <article
      onClick={createNote}
      className={cn(
        "cursor-pointer break-inside-avoid flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-200 rounded-2xl p-5 mb-4 transition",
        creating && "opacity-50 pointer-events-none"
      )}
    >
      <PlusCircle className="w-8 h-8" />
      <span className="mt-2 text-lg font-medium">
        {creating ? "Creating…" : "New Note"}
      </span>
    </article>
  );
};

