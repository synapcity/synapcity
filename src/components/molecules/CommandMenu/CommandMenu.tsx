"use client";

import React, { useState, useCallback } from "react";
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

type CommandMenuItem = {
  label: string;
  shortcut?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
};

type CommandMenuGroup = {
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
};

export function CommandMenu({
  open: controlledOpen,
  onOpenChange,
  groups,
  title = "Command Palette",
  description = "Search or navigate with ↑ ↓ ↵",
  showCloseButton = true,
  searchPlaceholder = "Type a command...",
}: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (value: boolean) => {
    if (isControlled) {
      onOpenChange?.(value);
    } else {
      setInternalOpen(value);
    }
  };

  const handleSelect = useCallback((item: CommandMenuItem) => {
    item.onSelect?.();
    handleOpenChange(false);
  }, []);

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      title={title}
      description={description}
      showCloseButton={showCloseButton}
      className="bg-white text-[var(--background)]"
    >
      <CommandInput data-testid="command-input" placeholder={searchPlaceholder} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {groups.map((group, groupIdx) => (
          <React.Fragment key={group.heading}>
            {groupIdx > 0 && <CommandSeparator />}
            <CommandGroup heading={group.heading}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.label}
                  onSelect={() => handleSelect(item)}
                  disabled={item.disabled}
                >
                  {item.icon}
                  {item.label}
                  {item.shortcut && (
                    <CommandShortcut>{item.shortcut}</CommandShortcut>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </React.Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
