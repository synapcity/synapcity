"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ScheduleEvent } from "@/stores/scheduleStore";
import {
  UITooltip as Tooltip,
  UITooltipContent as TooltipContent,
  UITooltipProvider as TooltipProvider,
  UITooltipTrigger as TooltipTrigger,
} from "@/components/atoms";
import {
  CheckSquare,
  Link2,
  StickyNote,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import { NoteEditorMini } from "../NoteEditorMini";

const ICONS: Record<string, LucideIcon> = {
  note: StickyNote,
  task: CheckSquare,
  link: Link2,
  dashboard: LayoutDashboard,
};

export function EventResourceIcons({ event, setType }: { event: ScheduleEvent; setType: (type: string) => void; }) {
  const [open, setOpen] = useState<string | null>(null);

  const groups = useMemo(() => {
    const res: Record<string, typeof event.resources> = {};
    (event.resources ?? []).forEach(r => {
      if (!res[r.type]) res[r.type] = [];
      res[r.type]!.push(r);
    });
    return res;
  }, [event]);

  // const handleToggle = (type: string, e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   setOpen(prev => (prev === type ? null : type));
  // };

  const types = Object.keys(groups);
  if (types.length === 0) return null;

  return (
    <div className="relative mt-1" onClick={e => e.stopPropagation()}>
      <div className="flex gap-1">
        {types.map(type => {
          const Icon = ICONS[type] ?? Link2;
          const count = groups[type]!.length;
          const label = `${count} ${type}${count > 1 ? "s" : ""}`;
          return (
            <TooltipProvider key={type} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="p-1"
                    onClick={e => {
                      e.stopPropagation()
                      // handleToggle(type, e)
                      setType(type)
                    }}
                  >
                    <Icon className="w-4 h-4 opacity-50 hover:opacity-100" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
      <AnimatePresence>
        {open && groups[open] && (
          <motion.div
            key={open}
            initial={{ opacity: 0, scale: 0.97, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -5 }}
            transition={{ duration: 0.17 }}
            className="absolute left-0 mt-2 bg-(--background) text-(--foreground) border rounded-xl shadow-lg z-[99999] p-2"
            style={{ minWidth: 200 }}
            onClick={e => e.stopPropagation()}
          >
            {open === "note" ? (
              groups[open]!.map(r => (
                <div key={r.resourceId} className="mb-2 last:mb-0">
                  <NoteEditorMini noteId={r.resourceId} />
                </div>
              ))
            ) : (
              <ul className="text-xs">
                {groups[open]!.map(r => (
                  <li key={r.resourceId} className="mb-1 last:mb-0">
                    {r.label}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}