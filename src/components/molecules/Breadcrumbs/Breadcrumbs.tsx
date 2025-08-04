"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/utils";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  iconOnly?: boolean;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      className="px-6 flex items-center text-sm text-muted-foreground gap-1"
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <ChevronRight
              className="h-4 w-4 mx-1 text-muted"
              aria-hidden="true"
            />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:underline flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.icon}
              <span className={cn({ "sr-only": item.iconOnly })}>
                {item.label}
              </span>
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