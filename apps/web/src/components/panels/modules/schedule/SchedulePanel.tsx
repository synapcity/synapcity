"use client";

import { useScheduleStore } from "@/stores/scheduleStore";
import {
  addDays,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useState } from "react";
import { ExpandableEventMiniCard } from "./components";

export const SchedulePanel = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const events = useScheduleStore((s) => s.events);

  const today = new Date();
  const todayIso = today.toISOString().slice(0, 10);
  const todayEvents = events.filter((e) => e.start.slice(0, 10) === todayIso);

  if (todayEvents.length > 0) {
    return (
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-semibold">{format(today, "PPP")}</h2>
        {todayEvents.map((e) => (
          <ExpandableEventMiniCard
            key={e.id}
            event={e}
            open={openId === e.id}
            onToggle={() => (openId === e.id ? setOpenId(null) : setOpenId(e.id))}
          />
        ))}
      </div>
    );
  }

  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });

  const days: Date[] = [];
  for (let d = startDate; d <= monthEnd || days.length % 7 !== 0; d = addDays(d, 1)) {
    days.push(d);
  }

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">{format(today, "MMMM yyyy")}</h2>
      <div className="grid grid-cols-7 text-center text-xs mb-1">
        {dayNames.map((d) => (
          <div key={d} className="font-medium">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-sm">
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={`p-2 border border-[var(--border)] h-20 flex items-start justify-end ${
              isSameMonth(day, monthStart) ? "" : "text-muted-foreground"
            } ${isSameDay(day, today) ? "bg-[var(--accent-background)] font-semibold" : ""}`}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulePanel;
