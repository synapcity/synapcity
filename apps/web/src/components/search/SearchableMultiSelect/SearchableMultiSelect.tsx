"use client";

import React, { useState, useMemo, useRef, KeyboardEvent } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "@/components/atoms/ui/command";
import { PopoverWrapper } from "@/components/molecules/PopoverWrapper";
import { cn } from "@/utils";
import { X } from "lucide-react";
import { useDebouncedSearch } from "@/hooks/controls/search/useDebouncedSearch";

export type SearchableMultiSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type Props = {
  value: string[];
  onChange?: (selected: string[]) => void;
  options?: SearchableMultiSelectOption[];
  onSearch?: (query: string) => Promise<SearchableMultiSelectOption[]>;
  onCreateOption?: (label: string) => void;
  placeholder?: string;
  triggerLabel?: string;
  className?: string;
  maxSelected?: number;
  backspaceToRemove?: boolean;
  renderTagsBelow?: boolean;
  showClearButton?: boolean;
  getTagIcon?: (value: string) => React.ReactNode;
  getTagColor?: (value: string) => string;
};

export function SearchableMultiSelect({
  value = [],
  onChange,
  options = [],
  onSearch,
  onCreateOption,
  placeholder = "Search or create...",
  triggerLabel,
  className,
  maxSelected,
  backspaceToRemove = true,
  renderTagsBelow = false,
  showClearButton = false,
  getTagIcon,
  getTagColor,
}: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const debouncedSearch = useDebouncedSearch(input, onSearch, 250);
  const fetchedOptions = debouncedSearch;

  const inputRef = useRef<HTMLInputElement>(null);

  const selectedSet = useMemo(() => new Set(value), [value]);
  const lowerInput = input.trim().toLowerCase();

  const combinedOptions = fetchedOptions && fetchedOptions.length > 0 ? fetchedOptions : options;

  const matchedOptions = useMemo(() => {
    if (!lowerInput) return combinedOptions;
    return combinedOptions.filter((opt) => opt.value.toLowerCase().includes(lowerInput));
  }, [combinedOptions, lowerInput]);

  const isCreatable =
    onCreateOption &&
    input.trim() &&
    !combinedOptions.some((opt) => opt.label.toLowerCase() === lowerInput);

  const atMax = typeof maxSelected === "number" && value.length >= maxSelected;

  const handleToggle = (val: string) => {
    if (selectedSet.has(val)) {
      onChange?.(value.filter((v) => v !== val));
    } else if (!atMax) {
      onChange?.([...value, val]);
    }
  };

  const handleCreate = () => {
    const trimmed = input.trim();
    if (onCreateOption && trimmed) {
      onCreateOption(trimmed);
      setInput("");
      setOpen(false);
    }
  };

  const handleRemove = (val: string) => {
    onChange?.(value.filter((v) => v !== val));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (backspaceToRemove && e.key === "Backspace" && input === "" && value.length > 0) {
      onChange?.(value.slice(0, -1));
    }
  };

  const selectedOptions = useMemo(
    () => combinedOptions.filter((opt) => selectedSet.has(opt.value)),
    [combinedOptions, selectedSet]
  );
  const tagPill = (label: string, val: string) => {
    const iconNode = getTagIcon?.(val);
    return (
      <span
        key={val}
        data-testid={`tag-pill-${val}`}
        className={cn(
          "text-(--accent-foreground) inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs",
          getTagColor?.(val) ? `bg-[${getTagColor(val)}]` : "bg-(--accent-200)"
        )}
      >
        {iconNode && (
          <span aria-hidden="true" data-testid={`icon-${val}`}>
            {iconNode}
          </span>
        )}
        {label}
        <X
          className="size-3.5 cursor-pointer hover:text-(--destructive)"
          onClick={(e) => {
            e.stopPropagation();
            handleRemove(val);
          }}
        />
      </span>
    );
  };

  return (
    <div className="space-y-1 bg-(--background) text-(--foreground)">
      <PopoverWrapper
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          setInput("");
        }}
        trigger={
          <div
            className={cn(
              "border-(--input) hover:bg-(--muted)/30 bg-(--muted) text-(--foreground) focus:ring-ring inline-flex min-h-9 w-full flex-wrap items-center gap-1 rounded-md border px-2 py-1 text-sm transition-all focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            role="button"
            data-testid="popover-trigger"
          >
            {!renderTagsBelow && selectedOptions.length > 0 ? (
              selectedOptions.map((opt) => tagPill(opt.label, opt.value))
            ) : (
              <span className="text-(--muted-foreground)">{triggerLabel ?? "Select…"}</span>
            )}

            <svg className="ml-auto size-4 shrink-0 opacity-50" viewBox="0 0 20 20" fill="none">
              <path
                d="M6 8L10 12L14 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        }
        content={
          <Command
            className="min-w-[200px] max-h-60 bg-(--background) text-(--foreground)"
            data-testid="popover-content"
          >
            <CommandInput
              ref={inputRef}
              placeholder={placeholder}
              value={input}
              onValueChange={setInput}
              onKeyDown={handleKeyDown}
              data-testid="command-input"
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {matchedOptions.map((opt) => {
                  const isSelected = selectedSet.has(opt.value ?? input);
                  return (
                    <CommandItem
                      key={opt.value}
                      disabled={opt.disabled || (!isSelected && atMax)}
                      onSelect={() => handleToggle(opt.value)}
                      aria-disabled={opt.disabled || (!isSelected && atMax)}
                    >
                      <span
                        className={cn(
                          "mr-auto flex items-center gap-2",
                          isSelected && "font-medium text-(--primary)"
                        )}
                      >
                        {getTagIcon?.(opt.value)}
                        {(() => {
                          const icon = getTagIcon?.(opt.value);
                          return icon ? (
                            <span aria-hidden="true" data-testid={`icon-${opt.value}`}>
                              {icon}
                            </span>
                          ) : null;
                        })()}
                        {opt.label}
                      </span>
                      {isSelected && (
                        <svg
                          className="ml-auto size-4 text-(--primary)"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </CommandItem>
                  );
                })}
                {isCreatable && (
                  <CommandItem className="text-(--muted-foreground) italic" onSelect={handleCreate}>
                    Create “{input.trim()}”
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        }
      />

      {renderTagsBelow && selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1" data-testid="selected-tags">
          {selectedOptions.map((opt) => tagPill(opt.label, opt.value))}
        </div>
      )}

      {showClearButton && value.length > 0 && (
        <button
          type="button"
          onClick={() => onChange?.([])}
          className="text-xs text-(--muted-foreground) underline hover:text-(--foreground) mt-1"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
