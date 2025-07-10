"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Layers } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/atoms/ui/sidebar"
import clsx from "clsx"
import { Label } from "@/components/atoms"

type Props<T extends { id: string, label: string }> = {
  items: T[];
  activeItem?: T;
  setActiveItemId: (id?: string) => void;
};
export function ContextSelector<T extends { id: string, label: string; }>({ items, activeItem, setActiveItemId }: Props<T>) {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={clsx(
                "data-[state=open]:text-sidebar-accent-foreground bg-accent dark:bg-accent-800 text-accent-200 hover:text-accent-50 dark:hover:text-white",
              )}
            >
              <div className={clsx(
                "flex aspect-square size-8 items-center justify-center rounded-lg font-inherit ",
              )}>
                <Layers className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                {/* <span className="text-xs text-muted-foreground uppercase font-semibold">{type}</span> */}
                <span className="truncate ">{activeItem?.label || "Select…"}</span>

              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {items.map((item) => item && (
              <DropdownMenuItem key={item?.id} onSelect={() => setActiveItemId(item?.id)}>
                <Label>
                  {item?.label}
                </Label>
                {item?.id === activeItem?.id && <Check className="ml-auto size-4 dark:text-accent-100" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
