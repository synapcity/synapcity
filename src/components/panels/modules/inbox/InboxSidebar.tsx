"use client";

import { useInboxStore } from "@/stores/inboxStore";
import { cn } from "@/utils";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { InboxCaptureForm } from "./InboxCaptureForm";

export const InboxSidebar = () => {
  const grouped = useInboxStore((s) => s.getGroupedByDate)();
  const selectedDate = useInboxStore((s) => s.selectedDate);
  const selectDate = useInboxStore((s) => s.selectDate);

  const getLabel = (dateStr: string) => {
    const date = parseISO(dateStr);
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "MMMM d, yyyy");
  };

  return (
    <aside className="w-full p-2 space-y-1">
      <InboxCaptureForm />
      {Object.entries(grouped)
        .sort((a, b) => (a[0] < b[0] ? 1 : -1))
        .map(([date, items]) => (
          <button
            key={date}
            onClick={() => selectDate(date)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted text-sm transition",
              selectedDate === date && "bg-muted font-semibold"
            )}
          >
            <span>{getLabel(date)}</span>
            <span className="text-xs opacity-70">{items.length}</span>
          </button>
        ))}
    </aside>
  );
};
