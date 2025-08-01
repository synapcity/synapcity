"use client";

import { Sidebar } from "@/components/atoms/ui/sidebar/Sidebar";
import { SidebarContent } from "@/components/atoms/ui/sidebar/SidebarContent";
import { SidebarMainMenu } from "@/components/atoms/ui/sidebar/SidebarMainMenu";
import { SidebarSection } from "@/components/atoms/ui/sidebar/SidebarSection";
import { CreateDashboardModal } from "@/components/dashboards";
import { CreateNoteModal } from "@/components/notes";
import { useDashboardStore } from "@/stores/dashboardStore/useDashboardStore";
import { useNoteStore } from "@/stores";
import { LayoutDashboard, FileText, Home, Inbox, Calendar, Search, Settings } from "lucide-react";
import React from "react";
import { useShallow } from "zustand/shallow";

export default function AppSidebar() {
  const dashboardsObj = useDashboardStore(useShallow((s) => s.items));
  const dashboards = React.useMemo(
    () => Object.values(dashboardsObj).map(({ id, name }) => ({ id, name })),
    [dashboardsObj]
  );
  const notesObj = useNoteStore(useShallow((s) => s.items));
  const notes = React.useMemo(
    () => Object.values(notesObj).map(({ id, title }) => ({ id, title })),
    [notesObj]
  );

  const [createDashboardOpen, setCreateDashboardOpen] = React.useState(false);
  const [createNoteOpen, setCreateNoteOpen] = React.useState(false);

  const mainMenuItems = [
    { title: "Home", url: "/home", icon: Home },
    { title: "Inbox", url: "#", icon: Inbox },
    { title: "Calendar", url: "#", icon: Calendar },
    { title: "Search", url: "#", icon: Search },
    { title: "Settings", url: "#", icon: Settings },
  ];

  return (
    <Sidebar variant="container" collapsible="offcanvas" className="shrink-0">
      <SidebarContent className="py-6">
        <SidebarMainMenu items={mainMenuItems} />
        <SidebarSection
          label="Dashboards"
          labelLink="/home/dashboards"
          action={<CreateDashboardModal open={createDashboardOpen} setOpen={setCreateDashboardOpen} />}
          emptyLabel="No dashboards"
          items={dashboards}
          itemUrl={(d) => `/home/dashboards/${d.id}`}
          itemIcon={LayoutDashboard}
          getItemLabel={(d) => d.name}
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
        />
      </SidebarContent>
    </Sidebar>
  );
}
