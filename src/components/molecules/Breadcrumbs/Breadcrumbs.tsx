"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home as HomeIcon, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/atoms/ui/sidebar/SidebarProvider";
import { useDashboardStore } from "@/stores/dashboardStore/useDashboardStore";
import { useNoteStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import { cn } from "@/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  iconOnly?: boolean;
}

function useDynamicBreadcrumbItems(segments: string[]): BreadcrumbItem[] {
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
        icon: <HomeIcon className="h-4 w-4" />,
      });
      return;
    }
    if (segment === "notes") {
      items.push({
        label: "Notes",
        href: path,
        icon: <HomeIcon className="h-4 w-4" />,
      });
      return;
    }
    if (segments[idx - 1] === "dashboards" && dashboards?.[segment]) {
      items.push({
        label: dashboards[segment].name,
        href: path,
        icon: <HomeIcon className="h-4 w-4" />,
      });
      return;
    }
    if (segments[idx - 1] === "notes" && notes?.[segment]) {
      items.push({
        label: notes[segment].title,
        href: path,
        icon: <HomeIcon className="h-4 w-4" />,
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

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="px-6 flex items-center text-sm text-muted-foreground gap-1" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <ChevronRight className="h-4 w-4 mx-1 text-muted" aria-hidden />}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:underline flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.icon}
              <span className={cn({ "sr-only": item.iconOnly })}>{item.label}</span>
            </Link>
          ) : (
            <span className="font-semibold flex items-center gap-1 text-foreground text-base">
              {item.icon}
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export function BreadcrumbHeader() {
  const pathname = usePathname();
  const segments = pathname.replace(/^\/|\/$/g, "").split("/").filter(Boolean);
  const items = useDynamicBreadcrumbItems(segments);
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex items-center gap-4 px-6 pt-6 pb-2 border-b min-h-[40px]">
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        className="rounded-lg p-2 hover:bg-accent/10 transition-colors"
      >
        <Menu className="h-5 w-5 text-muted-foreground" />
      </button>
      <Breadcrumbs items={items} />
    </header>
  );
}
