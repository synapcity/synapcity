"use client";

import { useState } from "react";
import { TagPills } from "../../../../../tables/pills/TagPills/TagPills";
import type { ScheduleEvent } from "@/types/schedule";

// --- Types for state ---
type Reminder = {
  minutesBefore: number;
  channels: ("browser" | "email" | "sms" | "audio")[];
};
type Tag = { label: string; color?: string; value: string };

export function ScheduleEventForm({
  event,
  onSave,
  onCancel,
}: {
  event?: ScheduleEvent | null;
  onSave: (data: Omit<ScheduleEvent, "id">) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(event?.title || "");
  const [start, setStart] = useState(event?.start || new Date().toISOString());
  const [end, setEnd] = useState(event?.end || "");
  const [tags, setTags] = useState<Tag[]>(event?.tags || []);
  const [notes, setNotes] = useState(event?.notes || "");
  const [reminders, setReminders] = useState<Reminder[]>(event?.reminder ?? []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      title,
      start,
      end,
      tags,
      notes,
      reminder: reminders,
      // Add other fields as needed, e.g. allDay, location, etc.
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          className="w-full border rounded px-2 py-1"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          autoFocus
        />
      </div>
      <div className="flex gap-2">
        <div>
          <label className="block text-xs mb-0.5">Start</label>
          <input
            type="datetime-local"
            className="border rounded px-1 py-0.5 w-36"
            value={start.slice(0, 16)}
            onChange={e =>
              setStart(new Date(e.target.value).toISOString())
            }
          />
        </div>
        <div>
          <label className="block text-xs mb-0.5">End</label>
          <input
            type="datetime-local"
            className="border rounded px-1 py-0.5 w-36"
            value={end ? end.slice(0, 16) : ""}
            onChange={e =>
              setEnd(new Date(e.target.value).toISOString())
            }
          />
        </div>
      </div>
      <div>
        <label className="block text-xs mb-0.5">Tags</label>
        <TagPills tags={tags} onRemove={val => setTags(tags.filter(t => t.value !== val))} />
        {/* If you want to add more tag editing/adding, put it here */}
      </div>
      <div>
        <label className="block text-xs mb-0.5">Reminders</label>
        {reminders.map((rem, i) => (
          <div key={i} className="flex gap-2 items-center mb-1">
            <input
              type="number"
              min={0}
              value={rem.minutesBefore}
              onChange={e =>
                setReminders(r =>
                  r.map((rj, j) =>
                    j === i ? { ...rj, minutesBefore: +e.target.value } : rj
                  )
                )
              }
              className="w-16 border rounded px-1"
              placeholder="min before"
            />
            {["browser", "email", "sms", "audio"].map(ch => (
              <label key={ch} className="flex items-center gap-1 text-xs">
                <input
                  type="checkbox"
                  checked={rem.channels.includes(ch as Reminder["channels"][number])}
                  onChange={e =>
                    setReminders(r =>
                      r.map((rj, j) =>
                        j === i
                          ? {
                            ...rj,
                            channels: e.target.checked
                              ? [...rj.channels, ch as Reminder["channels"][number]]
                              : rj.channels.filter(c => c !== ch)
                          }
                          : rj
                      )
                    )
                  }
                />
                {ch}
              </label>
            ))}
            <button
              type="button"
              onClick={() => setReminders(r => r.filter((_, j) => j !== i))}
              className="ml-1 text-xs"
              aria-label="Remove reminder"
            >
              🗑
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setReminders(r => [...r, { minutesBefore: 10, channels: ["browser"] }])}
          className="px-2 py-1 rounded bg-muted text-xs mt-1"
        >
          + Add Reminder
        </button>
      </div>
      <div>
        <label className="block text-xs mb-0.5">Notes</label>
        <textarea
          className="w-full border rounded p-2"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </div>
      <div className="flex gap-2 mt-2">
        <button type="submit" className="bg-primary text-white rounded px-4 py-1">
          Save
        </button>
        <button type="button" onClick={onCancel} className="rounded px-4 py-1 bg-muted">
          Cancel
        </button>
      </div>
    </form>
  );
}
