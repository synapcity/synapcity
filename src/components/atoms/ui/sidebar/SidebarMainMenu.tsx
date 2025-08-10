"use client";

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/atoms/ui/sidebar";
import { GlobalCommandMenu } from "@/components/search/GlobalCommandSearch/GlobalCommandMenu";
import { useKeyboardShortcut } from "@/hooks";
import { Home, Inbox, Search, type LucideIcon } from "lucide-react";
import { CommandShortcut } from "../command";
import { useCommandMenuStore, useUIStore } from "@/stores";
import { useRouter } from "next/navigation";

export interface MainMenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  shortcut?: string;
  action?: () => void;
}

export function SidebarMainMenu() {
  const router = useRouter();
  const setIsCommandOpen = useCommandMenuStore((s) => s.setOpen);
  const toggleCompState = useUIStore((s) => s.toggleCompState);

  useKeyboardShortcut({
    key: "k",
    metaKey: true,
    onKeyPressed: () => setIsCommandOpen(true),
  });

  useKeyboardShortcut({
    key: "i",
    metaKey: true,
    onKeyPressed: () => toggleCompState("userPanel", "isVisible"),
  });

  useKeyboardShortcut({
    key: "h",
    metaKey: true,
    onKeyPressed: () => router.push("/home"),
  });

  const items = [
    {
      title: "Home",
      url: "/home",
      icon: Home,
      shortcut: "⌘H",
      action: () => router.push("/home"),
      shortcutTooltip: "Cmd+H",
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      shortcut: "⌘I",
      action: () => toggleCompState("userPanel", "isVisible"),
      shortcutTooltip: "Cmd+I",
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
      shortcut: "⌘K",
      action: () => setIsCommandOpen(true),
      shortcutTooltip: "Cmd+K",
    },
  ];
  return (
    <div>
      <>
        <SidebarMenu className="shrink-0">
          {items.map((item) => {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton onClick={item.action} asChild>
                  <span className="w-full flex justify-between items-center pr-2">
                    <span className="flex items-center gap-2 px-2 py-1">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </span>
                    {item.shortcut && (
                      <CommandShortcut side="right" content={item.shortcutTooltip}>
                        {item.shortcut}
                      </CommandShortcut>
                    )}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
        <GlobalCommandMenu key="global-search" />
      </>
    </div>
  );
}
