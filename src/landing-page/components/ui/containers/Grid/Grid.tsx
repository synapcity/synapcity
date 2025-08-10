"use client";
import { cn } from "@/landing-page/lib/utils";
import { ReactNode, ElementType, forwardRef } from "react";

export type GridProps<E extends ElementType = "div"> = {
  as?: E;
  children?: ReactNode;
  className?: string;
  columns?: string | { base?: string; sm?: string; md?: string; lg?: string; xl?: string };
  rows?: string | { base?: string; sm?: string; md?: string; lg?: string; xl?: string };
  gap?: string | { base?: string; sm?: string; md?: string; lg?: string; xl?: string };
} & Omit<React.ComponentPropsWithoutRef<E>, "as">;

export const Grid = forwardRef(
  <E extends ElementType = "div">(
    { as, children, className, columns, rows, gap = "4", ...rest }: GridProps<E>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const Component = as || "div";

    const gridClasses = cn(
      "grid",
      columns &&
        (typeof columns === "string"
          ? columns
          : `grid-cols-${columns.base ?? "1"} sm:grid-cols-${columns.sm ?? "1"} md:grid-cols-${columns.md ?? "1"} lg:grid-cols-${columns.lg ?? "1"} xl:grid-cols-${columns.xl ?? "1"}`),
      rows &&
        (typeof rows === "string"
          ? `grid-rows-${rows}`
          : `grid-rows-${rows.base ?? "1"} sm:grid-rows-${rows.sm ?? "1"} md:grid-rows-${rows.md ?? "1"} lg:grid-rows-${rows.lg ?? "1"} xl:grid-rows-${rows.xl ?? "1"}`),
      gap &&
        (typeof gap === "string"
          ? `gap-${gap}`
          : `gap-${gap.base ?? "4"} sm:gap-${gap.sm ?? gap.base ?? "4"} md:gap-${gap.md ?? gap.base ?? "4"} lg:gap-${gap.lg ?? gap.base ?? "4"} xl:gap-${gap.xl ?? gap.base ?? "4"}`),
      className
    );

    return (
      <Component ref={ref} className={gridClasses} {...rest}>
        {children}
      </Component>
    );
  }
);

Grid.displayName = "Grid";
