/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useScheduleStore } from "@/stores/scheduleStore";
import { ScheduleEventForm } from "./ScheduleEventForm";

export function EventResourceForm({ event, onClose }: { event: any; onClose: () => void }) {
  const updateEvent = useScheduleStore((s) => s.updateEvent);

  function handleSave(data: any) {
    updateEvent(event.id, {
      ...data,
      end: new Date(data.end) ?? undefined,
      notes: data.notes?.length ? data.notes.join("\n") : undefined,
    });
    onClose();
  }

  return <ScheduleEventForm event={event} onSave={handleSave} onCancel={onClose} />;
}
