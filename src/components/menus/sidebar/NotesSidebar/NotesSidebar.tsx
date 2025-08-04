"use client";

import * as React from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupContent } from "@/components/atoms/ui/sidebar";
import { useNoteStore } from "@/stores/resources";
import { usePanels } from "@/hooks";
import { useShallow } from "zustand/shallow";

interface NotesSidebarProps {
  id: string;
}

export function NotesSidebar({ id, ...props }: NotesSidebarProps & React.ComponentProps<typeof Sidebar>) {
  const currentNote = useNoteStore(useShallow(s => s.getResourceById(id)));
  const createNote = useNoteStore(s => s.addResource);
  const noteExists = Boolean(currentNote);
  const { panels, activePanel } = usePanels("note", id);

  React.useEffect(() => {
    if (!noteExists) {
      console.warn(`Note ${id} not found—creating a stub.`);
      createNote({ id });
    }
  }, [noteExists, id, createNote]);

  return (
    <Sidebar
      variant="container"
      collapsible="icon"
      side="right"
      className="
        overflow-hidden
        bg-[var(--background)]
        text-[var(--foreground)]
        flex-1
        flex
        flex-col
      "
      {...props}
    >
      {activePanel ? (
        <SidebarContent className="bg-[var(--sidebar-foreground)] text-[var(--sidebar)] p-2 flex-1 min-h-0 overflow-auto">
          {/* your <SidebarRenderer> or whatever */}
        </SidebarContent>
      ) : (
        <SidebarContent className="border-l bg-[var(--sidebar-foreground)] text-[var(--sidebar)] flex-1 min-h-0 overflow-auto">
          <SidebarHeader className="gap-3.5 border-b p-4">
            <span className="text-foreground text-base font-medium">
              Notes
            </span>
          </SidebarHeader>
          <SidebarGroup>
            <SidebarGroupContent>
              {panels.map((item) => (
                <a
                  href="#"
                  key={item.id}
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col gap-2 border-b p-4 text-sm leading-tight last:border-b-0"
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
    </Sidebar>
  );
}
