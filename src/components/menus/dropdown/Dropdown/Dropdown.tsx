"use client";

import * as React from "react";
import {
  DropdownMenu as BaseDropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/atoms/ui/dropdown-menu";
import { Icon, Button, type ButtonProps } from "@/components/atoms";
import { cn } from "@/utils";

interface DropdownItem {
  label: string;
  icon?: string;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  shortcut?: string;
  tooltip?: string;
}

export type DropdownGroup = "separator" | { label: string; items: DropdownItem[] } | DropdownItem;

interface DropdownProps {
  trigger?: ButtonProps; // render a <Button {...trigger} />
  items: DropdownGroup[];
  align?: "start" | "center" | "end";
  children?: React.ReactNode; // custom trigger node
  sideOffset?: number;
  className?: string; // extra class for <DropdownMenuContent>
}

export function Dropdown({
  trigger,
  items,
  align = "end",
  sideOffset = 6,
  children,
  className,
}: DropdownProps) {
  // Shared menu item class
  const itemClass =
    "group flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-sm text-sm " +
    "cursor-pointer select-none outline-none transition-colors " +
    "text-foreground " +
    "data-[highlighted]:bg-(--foreground) data-[highlighted]:text-(--background) " +
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

  const renderItem = (item: DropdownItem, key: React.Key) => (
    <DropdownMenuItem
      key={key}
      disabled={item.disabled}
      onSelect={() => {
        // prevent menu from closing only if you later add keepOpen logic
        if (!item.disabled) item.onSelect?.();
      }}
      className={cn(
        itemClass,
        item.destructive &&
          "text-red-600 data-[highlighted]:bg-red-600 data-[highlighted]:text-white"
      )}
    >
      <span className="flex items-center gap-2">
        {item.icon && <Icon name={item.icon} size="sm" />}
        <span>{item.label}</span>
      </span>

      {item.shortcut && (
        <span
          className={cn(
            "text-[11px] tabular-nums text-muted-foreground",
            "group-data-[highlighted]:text-[var(--accent-foreground)]"
          )}
        >
          {item.shortcut}
        </span>
      )}
    </DropdownMenuItem>
  );

  // —— Trigger resolution (NO Fragments) ——
  // Priority: children element → <Button {...trigger} /> → default outline button.
  let triggerNode: React.ReactElement;

  if (React.isValidElement(children)) {
    // Good: a single, focusable element (button, IconButton, etc.)
    triggerNode = children as React.ReactElement;
  } else if (children != null) {
    // Children provided but not a valid element (string, number, array): wrap in a button
    triggerNode = (
      <button
        type="button"
        className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      >
        {children}
      </button>
    );
  } else if (trigger) {
    // Use your design-system Button as the trigger
    triggerNode = <Button {...trigger} />;
  } else {
    // Sensible default
    triggerNode = (
      <Button variant="outline" size="sm">
        Menu
      </Button>
    );
  }

  return (
    <BaseDropdownMenu>
      <DropdownMenuTrigger asChild className="size-full inline-flex justify-center items-center">
        {triggerNode}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "min-w-[200px] rounded-md border bg-(--background) text-(--foreground) shadow-md ",
          "p-1",
          className
        )}
      >
        {items.map((entry, i) => {
          if (entry === "separator") {
            return <DropdownMenuSeparator key={`sep-${i}`} className="my-1" />;
          }

          if ("items" in entry) {
            return (
              <DropdownMenuGroup key={`group-${entry.label}`}>
                <DropdownMenuLabel className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  {entry.label}
                </DropdownMenuLabel>
                {entry.items.map((subItem, j) => renderItem(subItem, `${i}-${j}`))}
              </DropdownMenuGroup>
            );
          }

          return renderItem(entry, `item-${i}`);
        })}
      </DropdownMenuContent>
    </BaseDropdownMenu>
  );
}
