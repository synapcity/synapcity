"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/atoms/ui/sidebar";
import { type LucideIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import { CommandShortcut } from "../command";

interface SidebarSectionProps<T> {
  label: string;
  labelLink?: string;
  action?: React.ReactNode;
  emptyLabel: string;
  items: T[];
  itemUrl: (item: T) => string;
  itemIcon: LucideIcon;
  getItemLabel: (item: T) => string;
  keyboardShortcut?: string;
  keyboardShortcutTooltip?: string;
  activeItemId?: string | null;
}

export function SidebarSection<T extends { id: string }>({
  label,
  labelLink,
  action,
  emptyLabel,
  items,
  itemUrl,
  itemIcon: ItemIcon,
  getItemLabel,
  keyboardShortcut,
  keyboardShortcutTooltip,
  activeItemId,
}: SidebarSectionProps<T>) {
  return (
    <SidebarGroup>
      <div className="flex items-center justify-between px-1.5 py-2">
        {labelLink ? (
          <Link href={labelLink} className="font-semibold hover:underline">
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
          </Link>
        ) : (
          <SidebarGroupLabel>{label}</SidebarGroupLabel>
        )}
        <span className="flex items-center justify-center gap-2">
          {action && action}
          {keyboardShortcut && (
            <CommandShortcut side="right" content={keyboardShortcutTooltip}>
              {keyboardShortcut}
            </CommandShortcut>
          )}
        </span>
      </div>
      <SidebarGroupContent className="max-h-[300px]">
        <SidebarMenu>
          {items.length > 0 ? (
            items.map((item) => {
              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton isActive={activeItemId === item.id} asChild>
                    <Link href={itemUrl(item)} className="flex items-center gap-2 px-2 py-1">
                      <ItemIcon className="h-4 w-4" />
                      <span>{getItemLabel(item)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton disabled>
                <ItemIcon className="h-4 w-4" />
                <span className="text-(--foreground)">{emptyLabel}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
