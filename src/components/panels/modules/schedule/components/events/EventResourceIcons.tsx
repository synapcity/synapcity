"use client";

import { useMemo } from "react";
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

const ICONS: Record<string, LucideIcon> = {
  note: StickyNote,
  task: CheckSquare,
  link: Link2,
  dashboard: LayoutDashboard,
};

export function EventResourceIcons({
  event,
  setType,
}: {
  event: ScheduleEvent;
  setType: (type: string) => void;
}) {
  const groups = useMemo(() => {
    const res: Record<string, typeof event.resources> = {};
    (event.resources ?? []).forEach(r => {
      if (!res[r.type]) res[r.type] = [];
      res[r.type]!.push(r);
    });
    return res;
  }, [event]);

  const types = Object.keys(groups);
  if (types.length === 0) return null;

  return (
    <div className="mt-1 flex gap-1" onClick={e => e.stopPropagation()}>
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
                  onClick={() => setType(type)}
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
  );
}
