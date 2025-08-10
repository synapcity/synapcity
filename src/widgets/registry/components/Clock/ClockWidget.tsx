"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn, formatDate, formatTime } from "@/utils";
import { Card } from "@/components/atoms/ui/card";
import { Separator } from "@/components/atoms/ui/separator";
import { Info } from "lucide-react";

type ClockProps = {
  title: string;
  timezone: string;
  showSeconds: boolean;
};

type ClockSettings = {
  format: "12h" | "24h";
};

type Props = {
  widgetId: string;
  props: ClockProps;
  settings: ClockSettings;
  className?: string;
};

export function ClockWidget({ widgetId, props, settings, className }: Props) {
  const { title, timezone, showSeconds } = props;
  const { format } = settings;

  const [now, setNow] = useState<Date>(() => new Date());
  const intervalRef = useRef<number | null>(null);

  const tickInterval = showSeconds ? 1000 : 60_000;
  const timeStr = useMemo(
    () => formatTime(now, timezone, showSeconds, format),
    [now, timezone, showSeconds, format]
  );
  const dateStr = useMemo(() => formatDate(now, timezone), [now, timezone]);

  useEffect(() => {
    const now = new Date();
    const ms = now.getMilliseconds();
    const sec = now.getSeconds();
    const remainder = showSeconds ? 1000 - ms : (60 - sec) * 1000 - ms;

    const timeout = window.setTimeout(() => {
      setNow(new Date());
      intervalRef.current = window.setInterval(
        () => setNow(new Date()),
        tickInterval
      ) as unknown as number;
    }, remainder);

    const onVisibility = () => {
      if (document.hidden) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        setNow(new Date());
        if (!intervalRef.current) {
          intervalRef.current = window.setInterval(
            () => setNow(new Date()),
            tickInterval
          ) as unknown as number;
        }
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [showSeconds, tickInterval, timezone, format]);

  return (
    <Card
      className={cn(
        "h-full w-full p-3 flex flex-col justify-between rounded-2xl border bg-card/80 backdrop-blur",
        className
      )}
      data-widget-id={widgetId}
    >
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">{dateStr}</div>
        <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground">
          <Info className="h-3 w-3" />
          <span className="truncate max-w-[12rem]">{timezone}</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-4xl sm:text-5xl md:text-6xl font-semibold tabular-nums leading-none">
          {timeStr}
        </div>
      </div>

      <div className="mt-3">
        <Separator className="mb-2" />
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs text-muted-foreground">
            {settings.format === "24h" ? "24‑hour" : "12‑hour"}
            {showSeconds ? " • seconds" : ""}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ClockWidget;
