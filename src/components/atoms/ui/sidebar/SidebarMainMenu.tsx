"use client";

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/atoms/ui/sidebar";
import { GlobalCommandMenu } from "@/components/search/GlobalCommandSearch/GlobalCommandMenu";
import { useKeyboardShortcut } from "@/hooks";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CommandShortcut } from "../command";

export interface MainMenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export function SidebarMainMenu({ items }: { items: MainMenuItem[] }) {
  const [isCommandOpen, setIsCommandOpen] = useState(false)

  useKeyboardShortcut({
    key: "k",
    metaKey: true,
    onKeyPressed: () => setIsCommandOpen(true),
  });

  return (
    <div>
      <>
        <SidebarMenu className="shrink-0">
          {items.map((item) => {
            if (item.title === "Search") {
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => setIsCommandOpen(true)} asChild>
                    <span className="flex justify-between w-full items-center pr-2">
                      <span className="flex items-center gap-2 px-2 py-1">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        <CommandShortcut side="right" content="Cmd+K">⌘K</CommandShortcut>
                      </span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            }
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="flex items-center gap-2 px-4 py-1">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
        <GlobalCommandMenu key="global-search" open={isCommandOpen} onOpenChange={setIsCommandOpen} />
      </>
    </div>
  );
}
