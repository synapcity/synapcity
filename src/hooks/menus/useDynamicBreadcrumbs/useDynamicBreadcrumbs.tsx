"use client";

import React from "react";
import { Boxes, Home as HomeIcon, Library } from "lucide-react";
import { useDashboardStore } from "@/stores/dashboardStore/useDashboardStore";
import { useNoteStore } from "@/stores";
import { useShallow } from "zustand/shallow";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  iconOnly?: boolean;
}

export function useDynamicBreadcrumbs(segments: string[]): BreadcrumbItem[] {
  const dashboards = useDashboardStore(useShallow((s) => s.items));
  const notes = useNoteStore(useShallow((s) => s.items));

  let path = "";
  const items: BreadcrumbItem[] = [];

  segments.forEach((segment, idx) => {
    path += `/${segment}`;

    if (segment === "home") {
      items.push({
        iconOnly: true,
        label: "Home",
        href: "/home",
        icon: <HomeIcon className="h-4 w-4" />,
      });
      return;
    }

    if (segment === "dashboards") {
      items.push({
        label: "Dashboards",
        href: path,
        icon: <Boxes className="h-4 w-4" />,
      });
      return;
    }

    if (segment === "notes") {
      items.push({
        label: "Notes",
        href: path,
        icon: <Library className="h-4 w-4" />,
      });
      return;
    }

    if (segments[idx - 1] === "dashboards" && dashboards?.[segment]) {
      items.push({
        label: dashboards[segment].name,
        href: path,
        icon: dashboards[segment].icon
      });
      return;
    }

    if (segments[idx - 1] === "notes" && notes?.[segment]) {
      items.push({
        label: notes[segment].title,
        href: path,
        icon: notes[segment].icon
      });
      return;
    }

    items.push({
      label: segment[0]?.toUpperCase() + segment.slice(1),
      href: path,
    });
  });

  return items;
}