import {  Notebook, Compass, Inbox } from "lucide-react";
import { SidebarModule } from "../useSidebarModuleStore";

export const SIDEBAR_MODULES: SidebarModule[] = [
  {
    id: "inbox",
    label: "Inbox",
    icon: Inbox,
    component: <div className="p-4">Inbox content</div>,
    pinned: true,
  },
  {
    id: "notebooks",
    label: "Notebooks",
    icon: Notebook,
    component: <div className="p-4">Notebooks</div>,
  },
  {
    id: "explore",
    label: "Explore",
    icon: Compass,
    component: <div className="p-4">Explore panel</div>,
  },
];
