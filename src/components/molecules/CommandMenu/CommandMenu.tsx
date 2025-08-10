"use client";

import React, { useCallback } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/atoms/ui/command";

export type CommandMenuItem = {
  label: string | React.ReactNode;
  shortcut?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
};
export type CommandMenuGroup = {
  heading: string;
  items: CommandMenuItem[];
};

export type CommandMenuProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  groups: CommandMenuGroup[];
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
};

export function CommandMenu({
  open: controlledOpen,
  onOpenChange,
  groups,
  title = "Command Palette",
  description = "Search or navigate with ↑ ↓ ↵",
  showCloseButton = true,
  searchPlaceholder = "Type a command...",
  searchValue = "",
  onSearchChange,
}: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = useCallback(
    (value: boolean) => {
      if (isControlled) {
        onOpenChange?.(value);
      } else {
        setInternalOpen(value);
      }
    },
    [isControlled, onOpenChange]
  );

  const handleSelect = useCallback(
    (item: CommandMenuItem) => {
      item.onSelect?.();
      handleOpenChange(false);
    },
    [handleOpenChange]
  );

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      title={title}
      description={description}
      showCloseButton={showCloseButton}
      className="bg-(--background) text-(--foreground)"
    >
      <CommandInput
        data-testid="command-input"
        placeholder={searchPlaceholder}
        value={searchValue}
        onValueChange={onSearchChange}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {groups.map((group, groupIdx) => (
          <React.Fragment key={group.heading}>
            {groupIdx > 0 && <CommandSeparator />}
            <CommandGroup heading={group.heading} className="bg-(--background) text-(--foreground)">
              {group.items.map((item, idx) => (
                <CommandItem
                  key={`${item.label}-${idx}`}
                  onSelect={() => handleSelect(item)}
                  disabled={item.disabled}
                  className="hover:bg-gray-800 hover:text-gray-200 transition-all duration-300 ease-in-out"
                >
                  {item.icon}
                  {item.label}
                  {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                </CommandItem>
              ))}
            </CommandGroup>
          </React.Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
