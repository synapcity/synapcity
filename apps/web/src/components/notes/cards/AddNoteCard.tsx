/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PlusCircle } from "lucide-react";
import { useNoteStore } from "@/stores";
import { NoteResource } from "@/types";
import { CreateEntityCard } from "../../molecules/cards/CreateEntityCard";

export const AddNoteCard = () => {
  const createNote = useNoteStore((s) => s.addResourceWithDefaultView);
  const startStatus = useNoteStore((s) => s.startStatus);

  return (
    <CreateEntityCard
      idleLabel="New Note"
      creatingLabel="Creating…"
      icon={<PlusCircle className="w-8 h-8" />}
      create={async (signal) => {
        const note = (await createNote({ title: "", summary: "" } as any)) as NoteResource;
        if (signal.aborted) return null;
        return note;
      }}
      getSuccessPath={(note) => `/home/notes/${note.id}`}
      onStart={() => {
        startStatus("creating", "note");
      }}
      onFinish={() => {}}
      onFail={() => {}}
      ariaLabel="Create new note"
    />
  );
};
