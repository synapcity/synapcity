"use client";

import { InboxItem, useInboxStore } from "@/stores/inboxStore";
import { format, parseISO } from "date-fns";

export const InboxPanel = () => {
  const selectedDate = useInboxStore((s) => s.selectedDate);
  const getItemsByDate = useInboxStore((s) => s.getItemsByDate);
  let items: InboxItem[] = [];
  if (selectedDate) {
    items = getItemsByDate(selectedDate);
  }
  if (!selectedDate)
    return (
      <div className="p-4 text-sm text-[var(--accent-foreground)]">
        Select a day to view inbox items.
      </div>
    );

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-semibold">Inbox — {format(parseISO(selectedDate), "PPP")}</h2>
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded border border-[var(--border)] p-3 bg-[var(--accent-background)] text-[var(--accent-foreground)] shadow-sm text-sm"
        >
          <div className="text-xs text-[var(--primary-50)] mb-1">{item.type}</div>
          <pre className="whitespace-pre-wrap break-words text-[13px]">{item.content}</pre>
        </div>
      ))}
    </div>
  );
};
