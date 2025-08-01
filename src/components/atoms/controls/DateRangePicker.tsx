"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Button, IconButton } from "../buttons";
import { Input } from "../Input";
import { Label } from "../Label";

interface DateRangePickerProps {
  from?: string;
  to?: string;
  onChange: (range: { from?: string; to?: string }) => void;
}

export function DateRangePicker({ from, to, onChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const hasRange = !!from || !!to;
  const displayLabel = from || to
    ? `${from ?? "…"} — ${to ?? "…"}`
    : "Select date range";

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <div className="flex items-center gap-2">
        <Button
          aria-label="Select date range"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1 border rounded px-2 py-1 hover:bg-gray-100"
          type="button"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-sm truncate max-w-[120px]">{displayLabel}</span>
        </Button>
        {hasRange && (
          <IconButton
            aria-label="Clear date range"
            onClick={() => onChange({})}
            className="ml-1 text-xs underline"
            icon="clear"
            size="sm"
            tooltip="Clear date range"
          />
        )}
      </div>

      {open && (
        <div className="absolute z-10 mt-2 w-[240px] bg-(--background) text-(--foreground) border rounded shadow-lg p-3 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs mb-0">From</Label>
            <Input
              aria-label="From date"
              type="date"
              value={from ?? ""}
              onChange={(e) => onChange({ from: e.target.value, to })}
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
          <div className="flex justify-between items-center">
            <Label className="text-xs mb-0">To</Label>
            <Input
              aria-label="To date"
              type="date"
              value={to ?? ""}
              onChange={(e) => onChange({ from, to: e.target.value })}
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
          <div className="flex justify-between mt-1">
            <button
              type="button"
              onClick={() => {
                onChange({});
                setOpen(false);
              }}
              className="text-xs underline"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
