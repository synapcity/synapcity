"use client";

import * as React from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupContent, useSidebar } from "@/components/atoms/ui/sidebar";
import { IconSidebar } from "./IconSidebar/IconSidebar";
import { SidebarRenderer } from "./SidebarRenderer";
import { useNotesStore } from "@/stores/notesStore";
import { useTabsForEntity } from "@/hooks/features/useTabsForEntity";
import { usePanels } from "@/hooks/sidebar/usePanels";

interface NotesSidebarProps {
  id: string;
}

export function NotesSidebar({ id, ...props }: NotesSidebarProps & React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  const noteExists = useNotesStore((s) => Boolean(s.getItemById(id)));
  const createNote = useNotesStore((s) => s.addItem);
  const noteTabs = useTabsForEntity("note", id);
  const { panels, activePanel } = usePanels("note", id);

  React.useEffect(() => {
    if (!noteExists) {
      console.warn(`Note ${id} not found, creating empty stub.`);
      createNote({ id });
    }
  }, [noteExists, id, createNote]);

  return (
    <Sidebar
      auto
      collapsible="icon"
      side="right"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row bg-[var(--background)] text-[var(--foreground)]"
      style={{
        "--sidebar-width-icon": "3.5rem",
        "--sidebar-width": "30rem",
      } as React.CSSProperties}
      {...props}
    >
      <IconSidebar
        key={id}
        scope="note"
        id={id}
        onAdd={noteTabs.handleAddTab}
      />
      {open && (
        <>
          {activePanel ? (
            <SidebarContent className="bg-[var(--sidebar-foreground)] text-[var(--sidebar)] p-2" >
              <SidebarRenderer scope="note" id={id} />
            </SidebarContent>
          ) : (
            <SidebarContent className="border-l bg-[var(--sidebar-foreground)] text-[var(--sidebar)]">
              <SidebarHeader className="gap-3.5 border-b p-4">
                <div className="flex w-full items-center justify-between">
                  <span className="text-foreground text-base font-medium">
                    Notes
                  </span>
                </div>
              </SidebarHeader>
              <SidebarGroup className="px-0">
                <SidebarGroupContent>
                  {panels.map((item) => (
                    <a
                      href="#"
                      key={item.id}
                      className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                    >
                      <div className="flex w-full items-center gap-2">
                        <span>{item.label}</span>
                        {item.href && <span className="ml-auto text-xs">{item.href}</span>}
                      </div>
                    </a>
                  ))}
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          )}
        </>
      )}
    </Sidebar >
  );
}
