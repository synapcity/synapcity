"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/utils";
import { ChevronRight } from "lucide-react";
import { Icon } from "@/components/atoms";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode | string;
  iconOnly?: boolean;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      className="px-6 flex items-center text-sm text-muted-foreground gap-1"
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => {
        const IconComp = typeof item.icon === "string" ? (
          <Icon
            name={item.icon}
          />
        ) : item.icon
        return (
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
                {IconComp}
                <span className={cn({ "sr-only": item.iconOnly })}>
                  {item.label}
                </span>
              </Link>
            ) : (
              <span className="font-semibold flex items-center gap-1 text-foreground text-base">
                {IconComp}
                {item.label}
              </span>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  );
}