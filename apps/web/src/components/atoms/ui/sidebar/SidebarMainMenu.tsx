"use client";

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/atoms/ui/sidebar";
import { GlobalCommandMenu } from "@/components/search/GlobalCommandSearch/GlobalCommandMenu";
import { useKeyboardShortcut } from "@/hooks";
import { Home, Inbox, LayoutDashboard, Search, StickyNote, type LucideIcon } from "lucide-react";
import { CommandShortcut } from "../command";
import { useCommandMenuStore, useUIStore } from "@/stores";
import { usePathname, useRouter } from "next/navigation";

export interface MainMenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  shortcut?: string;
  action?: () => void;
}

export function SidebarMainMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const setIsCommandOpen = useCommandMenuStore((s) => s.setOpen);
  const toggleCompState = useUIStore((s) => s.toggleCompState);

  useKeyboardShortcut({
    combos: [{ key: "k", mod: true }],
    onKeyPressed: () => setIsCommandOpen(true),
  });

  useKeyboardShortcut({
    combos: [{ key: "i", mod: true }],
    onKeyPressed: () => toggleCompState("userPanel", "isVisible"),
  });

  useKeyboardShortcut({
    combos: [{ key: "h", mod: true }],
    onKeyPressed: () => router.push("/home"),
  });

  useKeyboardShortcut({
    combos: [{ key: "KeyN", mod: true, alt: true, shift: true }],
    allowInInputs: true,
    onKeyPressed: () => router.push("/home/notes"),
  });

  useKeyboardShortcut({
    combos: [{ key: "d", mod: true, shift: true }],
    onKeyPressed: () => router.push("/home/dashboards"),
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
      title: "Dashboards",
      url: "/home/dashboards",
      shortcut: "⌘⇧D",
      icon: LayoutDashboard,
      action: () => router.push("/home/dashboards"),
      shortcutTooltip: "Cmd+Shift+D",
    },
    {
      title: "Notes",
      url: "/home/notes",
      icon: StickyNote,
      shortcut: "⌘⌥⇧N",
      action: () => router.push("/home/notes"),
      shortcutTooltip: "Cmd+Opt(Alt)+Shift+N",
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
            const isActive = item.url !== "#" && pathname.endsWith(item.url);
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton onClick={item.action} isActive={isActive} asChild>
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
