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

export interface DropdownItem {
  label: string;
  icon?: string;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  shortcut?: string;
  tooltip?: string;
  active?: boolean;
}

export type DropdownGroup = "separator" | { label: string; items: DropdownItem[] } | DropdownItem;

export interface DropdownProps {
  trigger?: ButtonProps; // renders <Button {...trigger} />
  items: DropdownGroup[];
  align?: "start" | "center" | "end";
  sideOffset?: number;
  children?: React.ReactNode; // custom trigger node

  /** Layout/styling hooks */
  className?: string; // wrapper around Trigger (for placement)
  contentClassName?: string; // dropdown panel
}

export function Dropdown({
  trigger,
  items,
  align = "end",
  sideOffset = 6,
  children,
  className,
  contentClassName,
}: DropdownProps) {
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
        if (!item.disabled) item.onSelect?.();
      }}
      className={cn(
        itemClass,
        item.destructive &&
          "text-red-600 data-[highlighted]:bg-red-600 data-[highlighted]:text-white",
        item.active && "bg-(--muted)/50"
      )}
    >
      <span className="flex items-center gap-2">
        {item.active && <Icon name="check" size="sm" className="opacity-80" />}
        {item.icon && <Icon name={item.icon} size="sm" />}
        <span className={cn(item.active && "font-medium")}>{item.label}</span>
      </span>

      {item.shortcut && (
        <span className="text-[11px] tabular-nums text-muted-foreground group-data-[highlighted]:text-(--accent-foreground)">
          {item.shortcut}
        </span>
      )}
    </DropdownMenuItem>
  );

  // — Trigger resolution (NO cloneElement) —
  let triggerNode: React.ReactElement;
  if (React.isValidElement(children)) {
    triggerNode = children as React.ReactElement; // your custom element; style/position via wrapper
  } else if (children != null) {
    triggerNode = (
      <button
        type="button"
        className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--background)"
      >
        {children}
      </button>
    );
  } else if (trigger) {
    // When using our Button, you can pass `trigger.className`
    triggerNode = <Button {...trigger} />;
  } else {
    triggerNode = (
      <Button variant="outline" size="sm">
        Menu
      </Button>
    );
  }

  return (
    <BaseDropdownMenu>
      {/* Wrapper controls trigger placement in your layout */}
      <div className={className}>
        <DropdownMenuTrigger asChild>{triggerNode}</DropdownMenuTrigger>
      </div>

      <DropdownMenuContent
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "min-w-[200px] rounded-md border bg-(--background) text-(--foreground) shadow-md p-1",
          contentClassName
        )}
      >
        {items.map((entry, i) => {
          if (entry === "separator")
            return <DropdownMenuSeparator key={`sep-${i}`} className="my-1" />;
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
