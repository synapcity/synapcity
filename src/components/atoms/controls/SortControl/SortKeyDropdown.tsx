/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils";
import { SortKey } from "./SortControl";

interface SortKeyDropdownProps {
  sortKey: SortKey;
  onChange: (k: SortKey) => void;
}

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: "updatedAt", label: "Updated" },
  { value: "createdAt", label: "Created" },
  { value: "name", label: "Name" },
];

export function SortKeyDropdown({ sortKey, onChange }: SortKeyDropdownProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  // close on outside click / escape
  useEffect(() => {
    function handle(e: MouseEvent | KeyboardEvent) {
      if (e instanceof KeyboardEvent && e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
      if (e instanceof MouseEvent) {
        if (
          menuRef.current &&
          btnRef.current &&
          !menuRef.current.contains(e.target as Node) &&
          !btnRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handle as any);
    document.addEventListener("keydown", handle as any);
    return () => {
      document.removeEventListener("mousedown", handle as any);
      document.removeEventListener("keydown", handle as any);
    };
  }, []);

  // keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((o) => !o);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select sort key"
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-1 border rounded px-2 py-1 text-sm"
        type="button"
      >
        <span>{OPTIONS.find((o) => o.value === sortKey)?.label}</span>
        <ChevronDown className={cn("transition-transform", open ? "rotate-180" : "rotate-0")} size={14} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Sort key options"
          tabIndex={-1}
          ref={menuRef}
          className="absolute mt-1 w-full bg-white border rounded shadow-sm z-20 max-h-48 overflow-auto text-sm"
        >
          {OPTIONS.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === sortKey}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(opt.value);
                  setOpen(false);
                }
              }}
              tabIndex={0}
              className={cn(
                "cursor-pointer px-3 py-1 hover:bg-gray-100 flex justify-between",
                opt.value === sortKey ? "font-medium" : "font-normal"
              )}
            >
              <span>{opt.label}</span>
              {opt.value === sortKey && <span aria-hidden>✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
