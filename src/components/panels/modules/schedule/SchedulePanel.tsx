"use client";

// import { Icon } from "@/components/atoms";
import { useScheduleStore } from "@/stores/scheduleStore";
import {
  addDays,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  // parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
// import Link from "next/link";
// import { EventResourceIcons } from "./components/events/EventResourceIcons";
// import { AnimatePresence, motion } from "framer-motion";
// import { EventActions, ExpandableEventMiniCard } from "./components";
import { useState } from "react";
import { ExpandableEventMiniCard } from "./components";

export const SchedulePanel = () => {
  const [openId, setOpenId] = useState<string | null>(null)
  const events = useScheduleStore((s) => s.events);

  const today = new Date();
  const todayIso = today.toISOString().slice(0, 10);
  const todayEvents = events.filter((e) => e.start.slice(0, 10) === todayIso);

  if (todayEvents.length > 0) {
    return (
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-semibold">{format(today, "PPP")}</h2>
        {todayEvents.map((e) => (
          <ExpandableEventMiniCard key={e.id} event={e} open={openId === e.id} onToggle={() => openId === e.id ? setOpenId(null) : setOpenId(e.id)} />
          // <div
          //   key={e.id}
          //   className="rounded border border-[var(--border)] p-3 bg-[var(--accent-background)] text-[var(--accent-foreground)] shadow-sm text-sm flex justify-between items-center"
          // >
          //   <div className="flex flex-col justify-evenly">
          //     <div className="font-medium">{e.title}</div>
          //     <div className="text-xs text-muted-foreground">
          //       {format(parseISO(e.start), "p")}
          //       {e.end ? ` – ${format(parseISO(e.end), "p")}` : ""}
          //     </div>
          //     {e.location && (
          //       <div className="text-xs text-muted-foreground mt-1">
          //         {e.location.startsWith("http") ? (
          //           <Link
          //             href={e.location}
          //             target="_blank"
          //             rel="noopener noreferrer"
          //             className="inline-flex items-center gap-1"
          //           >
          //             <Icon name="link2" size="sm" />
          //           </Link>
          //         ) : (
          //           e.location
          //         )}
          //       </div>
          //     )}
          //   </div>
          //   {/* <div className="flex-1 flex border"> */}
          //   <EventResourceIcons event={e} />
          //   {/* </div> */}
          //   <AnimatePresence initial={false}>
          //     {open && (
          //       <motion.div
          //         initial={{ opacity: 0, scale: 0.97, y: -5 }}
          //         animate={{ opacity: 1, scale: 1, y: 0 }}
          //         exit={{ opacity: 0, scale: 0.98, y: -5 }}
          //         transition={{ duration: 0.17 }}
          //         className="absolute left-0 right-0 mt-2 bg-(--background) text-(--foreground) border rounded-xl shadow-lg z-[99999] p-4"
          //         style={{ minWidth: 260, maxWidth: 340 }}
          //         onClick={e => e.stopPropagation()}
          //       >
          //         <EventActions event={event} />
          //       </motion.div>
          //     )}
          //   </AnimatePresence>
        ))}
        {/* </div> */}
      </div>
    );
  }

  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });

  const days: Date[] = [];
  for (
    let d = startDate;
    d <= monthEnd || days.length % 7 !== 0;
    d = addDays(d, 1)
  ) {
    days.push(d);
  }

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">
        {format(today, "MMMM yyyy")}
      </h2>
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
            className={`p-2 border border-[var(--border)] h-20 flex items-start justify-end ${isSameMonth(day, monthStart)
              ? ""
              : "text-muted-foreground"
              } ${isSameDay(day, today)
                ? "bg-[var(--accent-background)] font-semibold"
                : ""
              }`}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulePanel;