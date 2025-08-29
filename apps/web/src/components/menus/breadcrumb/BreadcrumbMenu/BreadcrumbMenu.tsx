"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/atoms/ui/breadcrumb";
import React, { useCallback, useMemo } from "react";

type Segment = {
  label: string;
  href: string;
};

export const BreadcrumbMenu = ({ items }: { items: string[] }) => {
  const getLabel = useCallback((segment: string) => {
    const formattedSegment = segment.slice(0, 1).toUpperCase() + segment.slice(1).toLowerCase();
    return decodeURIComponent(formattedSegment);
  }, []);

  const finalItems: Segment[] = useMemo(() => {
    let path = "";
    return items.map((segment) => {
      path += `/${segment}`;
      return {
        label: getLabel(segment) || "",
        href: path,
      };
    });
  }, [items, getLabel]);

  return (
    <Breadcrumb className="hidden sm:block px-8">
      <BreadcrumbList>
        {finalItems.map((item, index) => {
          const isLast = index === finalItems.length - 1;
          return isLast ? (
            <BreadcrumbItem key={item.href}>
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <React.Fragment key={item.href}>
              <BreadcrumbItem>
                <BreadcrumbLink href={item.href} className="text-sm">
                  {item.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
