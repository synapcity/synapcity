"use client";

import { Sidebar } from "@/components/atoms/ui/sidebar/Sidebar";
import { SidebarContent } from "@/components/atoms/ui/sidebar/SidebarContent";
import { SidebarMainMenu } from "@/components/atoms/ui/sidebar/SidebarMainMenu";
import { SidebarSection } from "@/components/atoms/ui/sidebar/SidebarSection";
import { CreateDashboardModal } from "@/components/dashboards";
import { CreateNoteModal } from "@/components/notes";
import { useDashboardStore } from "@/stores/resources/dashboardStore/useDashboardStore";
import { useNoteStore } from "@/stores";
import { LayoutDashboard, FileText } from "lucide-react";
import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useKeyboardShortcut, usePanels } from "@/hooks";

export default function AppSidebar() {
  const dashboardsObj = useDashboardStore(useShallow((s) => s.items));
  const dashboards = React.useMemo(
    () => Object.values(dashboardsObj).map(({ id, name }) => ({ id, name })),
    [dashboardsObj]
  );
  const { activeId, setActive } = usePanels("global", "main");
  const notesObj = useNoteStore(useShallow((s) => s.items));
  const notes = React.useMemo(
    () => Object.values(notesObj).map(({ id, title }) => ({ id, title })),
    [notesObj]
  );
  const activeDashboardId = useDashboardStore(useShallow((s) => s.selected["dashboard"]));
  const activeNoteId = useNoteStore(useShallow((s) => s.selected["note"]));

  const [createDashboardOpen, setCreateDashboardOpen] = React.useState(false);
  const [createNoteOpen, setCreateNoteOpen] = React.useState(false);

  useEffect(() => {
    const active = activeDashboardId ?? activeNoteId ?? null;
    setActive(active);
  }, [activeDashboardId, activeNoteId, setActive]);

  useKeyboardShortcut({
    key: "D",
    metaKey: true,
    onKeyPressed: () => setCreateDashboardOpen(true),
  });

  useKeyboardShortcut({
    key: "N",
    metaKey: true,
    shiftKey: true,
    onKeyPressed: () => setCreateNoteOpen(true),
  });
  return (
    <Sidebar variant="container" className="shrink-0">
      <SidebarContent className="py-6">
        <SidebarMainMenu />
        <SidebarSection
          label="Dashboards"
          labelLink="/home/dashboards"
          action={
            <CreateDashboardModal open={createDashboardOpen} setOpen={setCreateDashboardOpen} />
          }
          emptyLabel="No dashboards"
          items={dashboards}
          itemUrl={(d) => `/home/dashboards/${d.id}`}
          itemIcon={LayoutDashboard}
          getItemLabel={(d) => d.name}
          keyboardShortcut="⌘D"
          keyboardShortcutTooltip="Cmd+D"
          activeItemId={activeId}
        />
        <SidebarSection
          label="Notes"
          labelLink="/home/notes"
          action={<CreateNoteModal open={createNoteOpen} setOpen={setCreateNoteOpen} />}
          emptyLabel="No notes"
          items={notes}
          itemUrl={(n) => `/home/notes/${n.id}`}
          itemIcon={FileText}
          getItemLabel={(n) => n.title}
          keyboardShortcut="⌘⇧N"
          keyboardShortcutTooltip="Cmd+Shift+N"
          activeItemId={activeId}
        />
      </SidebarContent>
    </Sidebar>
  );
}
