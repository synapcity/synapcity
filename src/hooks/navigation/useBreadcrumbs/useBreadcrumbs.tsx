"use client"

import type { BreadcrumbItem } from "@/components/molecules/Breadcrumbs";
import { useDashboardStore } from "@/stores/resources/dashboardStore/useDashboardStore";
import { useNoteStore } from "@/stores";
import { LayoutDashboard, FileText, Home as HomeIcon } from "lucide-react";

export function useBreadcrumbs(segments: string[]): BreadcrumbItem[] {
  const dashboards = useDashboardStore((s) => s.items);
  const notes = useNoteStore((s) => s.items);

  let path = "";
  const items: BreadcrumbItem[] = [];

  segments.forEach((segment, idx) => {
    path += `/${segment}`;

    if (segment === "home") {
      items.push({
        label: "Home",
        href: "/home",
        icon: <HomeIcon className="h-4 w-4" />,
        iconOnly: true
      });
      return;
    }
    if (segment === "dashboards") {
      items.push({
        label: "Dashboards",
        href: path,
        icon: <LayoutDashboard className="h-4 w-4" />,
      });
      return;
    }
    if (segment === "notes") {
      items.push({
        label: "Notes",
        href: path,
        icon: <FileText className="h-4 w-4" />,
      });
      return;
    }
    if (segments[idx - 1] === "dashboards" && dashboards?.[segment]) {
      items.push({
        label: dashboards[segment].name,
        href: path,
        icon: <LayoutDashboard className="h-4 w-4" />,
      });
      return;
    }
    if (segments[idx - 1] === "notes" && notes?.[segment]) {
      items.push({
        label: notes[segment].title,
        href: path,
        icon: <FileText className="h-4 w-4" />,
      });
      return;
    }
    // fallback (should rarely happen)
    items.push({
      label: segment[0]?.toUpperCase() + segment.slice(1),
      href: path,
    });
  });

  return items;
}
