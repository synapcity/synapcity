"use client";

import { useState } from "react";
import { IconButton, Input } from "@/components";
import { useNoteStore } from "@/stores";
import { CreateModalShell } from "@/components/molecules/CreateModal";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function CreateNoteModal({ open, setOpen }: Props) {
  const createNote = useNoteStore((state) => state.addResource);
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;
    createNote({ title: title.trim() });
    setTitle("");
    setOpen(false);
  }

  return (
    <CreateModalShell
      open={open}
      setOpen={setOpen}
      trigger={<IconButton variant="ghost" label="Add Note" tooltip="Add Note" icon="plus" />}
      title="Create New Note"
      description="Enter a title for your note."
      onSubmit={handleSubmit}
      canSubmit={!!title.trim()}
      submitLabel="Create"
      cancelLabel="Cancel"
    >
      <Input
        autoFocus
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    </CreateModalShell>
  );
}
