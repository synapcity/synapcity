// components/layout/GridItem.tsx
import { cn } from "@/landing-page/lib/utils";
import { ReactNode, ElementType } from "react";

export type GridItemProps<E extends ElementType = "div"> = {
  as?: E;
  children: ReactNode;
  className?: string;
  colSpan?: string | { base?: string; sm?: string; md?: string; lg?: string; xl?: string };
  rowSpan?: string | { base?: string; sm?: string; md?: string; lg?: string; xl?: string };
  colStart?: string;
  rowStart?: string;
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  gap?: string; // Custom gap for this item
} & Omit<React.ComponentPropsWithoutRef<E>, "as">;

export function GridItem<E extends ElementType = "div">({
  as,
  children,
  className,
  colSpan,
  rowSpan,
  colStart,
  rowStart,
  justify = "center",
  align = "center",
  gap,
  ...rest
}: GridItemProps<E>) {
  const Component = as || "div";

  const gridItemClasses = cn(
    colSpan && `col-span-${colSpan}`,
    rowSpan && `row-span-${rowSpan}`,
    colStart && `col-start-${colStart}`,
    rowStart && `row-start-${rowStart}`,
    justify && `justify-${justify}`,
    align && `items-${align}`,
    gap && `gap-${gap}`,
    className
  );

  return (
    <Component className={gridItemClasses} {...rest}>
      {children}
    </Component>
  );
}
