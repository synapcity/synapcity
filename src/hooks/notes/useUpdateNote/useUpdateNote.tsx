"use client";

import { RefObject, useCallback } from "react";
import { useNoteStore } from "@/stores";
import type { Note } from "@/schemas/resources/note-schema";
import type { StatusField } from "@/types/ui";

export function useUpdateNote(noteId: string) {
  const status = useNoteStore(s => s.status)
  const updateResource = useNoteStore(s => s.updateResource);
  const startStatus = useNoteStore(s => s.startStatus);
  const finishStatus = useNoteStore(s => s.finishStatus);
  const failStatus = useNoteStore(s => s.failStatus);

  const editNote = useCallback(
    (ref: RefObject<HTMLElement | null>) => {
      startStatus("editing", "note", noteId)
      ref.current?.addEventListener("blur", () => {
        finishStatus("editing", "note", noteId)
      })
    }, [noteId, startStatus, finishStatus]
  )

  const updateNote = useCallback(
    async (updates: Partial<Note>, status: StatusField = "saving") => {
      try {
        startStatus(status, "note", noteId);
        await updateResource(noteId, updates);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        failStatus(status, err, "note", noteId);
        throw err;
      } finally {
        finishStatus(status, "note", noteId);
      }
    },
    [updateResource, startStatus, finishStatus, failStatus, noteId]
  );

  return {
    updateNote,
    editNote,
    status
  };
}
