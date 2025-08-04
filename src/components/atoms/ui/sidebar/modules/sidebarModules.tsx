import { Notebook, Compass, Inbox } from "lucide-react";
import { SidebarModule } from "../useSidebarModuleStore";

export const SIDEBAR_MODULES: SidebarModule[] = [
  {
    id: "inbox",
    label: "Inbox",
    icon: Inbox,
    component: <div className="p-4">Inbox content</div>,
    pinned: true,
    hidden: false
  },
  {
    id: "notebooks",
    label: "Notebooks",
    icon: Notebook,
    component: <div className="p-4">Notebooks</div>,
    hidden: false,
    pinned: false
  },
  {
    id: "explore",
    label: "Explore",
    icon: Compass,
    component: <div className="p-4">Explore panel</div>,
    hidden: false,
    pinned: false
  },
];

export const SIDEBAR_MODULES_BY_ID = SIDEBAR_MODULES.reduce(
  (acc, module) => {
    acc[module.id] = module;
    return acc;
  },
  {} as Record<string, SidebarModule>
);
