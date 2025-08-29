"use client";

import { useState, useEffect } from "react";
import { ScheduleEvent, useScheduleStore } from "@/stores/scheduleStore";
import { useNoteStore } from "@/stores/resources/noteStore/useNoteStore";
import { NoteEditorMini } from "../NoteEditorMini";
import { SidebarModal } from "../SidebarModal";
import { Note } from "@/stores";

export function EventActions({
  event,
}: {
  event: import("@/stores/scheduleStore/useScheduleStore/useScheduleStore").ScheduleEvent;
}) {
  const updateEvent = useScheduleStore((s) => s.updateEvent);
  const addNote = useNoteStore((s) => s.addResource);
  const getNoteById = useNoteStore((s) => s.getResourceById);

  const noteResource = event.resources?.find((r) => r.type === "note");
  const linkedNote = noteResource?.resourceId ? getNoteById(noteResource.resourceId) : undefined;

  const [note, setNote] = useState<Note | undefined>(linkedNote);
  const [showMini, setShowMini] = useState(false);
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    if (linkedNote) setNote(linkedNote);
  }, [linkedNote]);

  async function handleTakeNotes(event: ScheduleEvent) {
    if (note) {
      setShowMini((v) => !v);
      return;
    }
    const newNote = await addNote({
      title: `${event.title} Notes`,
      summary: "",
    });
    if (!newNote) return;
    setNote(newNote);
    await updateEvent(event.id, {
      resources: [
        ...(event.resources ?? []),
        { type: "note", resourceId: newNote.id, label: "Notes" },
      ],
    });
    setShowMini(true);
  }

  function handleOpenFull() {
    setShowFull(true);
  }

  return (
    <div>
      <button
        onClick={() => handleTakeNotes(event)}
        className="text-xs underline flex items-center gap-1 mt-2"
      >
        📝 {note ? (showMini ? "Hide Notes" : "Take/Continue Notes") : "Take Notes"}
      </button>
      {showMini && note && (
        <div className="mt-2 border-t pt-2">
          <NoteEditorMini noteId={note.id} />
          <button className="mt-2 text-xs underline text-primary" onClick={handleOpenFull}>
            Open as Full Note
          </button>
          <SidebarModal open={showFull} onClose={() => setShowFull(false)}>
            <div className="p-2">
              <h2 className="text-lg font-bold mb-2">Full Note</h2>
              <NoteEditorMini noteId={note.id} />
            </div>
          </SidebarModal>
        </div>
      )}
    </div>
  );
}
