"use client";
import { cn } from "@/landing-page/lib/utils";
import clsx from "clsx";
import { MotionConfigProps } from "framer-motion";
import dynamic from "next/dynamic";
import { ReactNode, ElementType, forwardRef } from "react";

const MotionDiv = dynamic(() => import("../../Motion/Motion").then((mod) => mod.MotionDiv), {
  ssr: false,
});
export type FlexProps<E extends ElementType = "div"> = {
  as?: E;
  children?: ReactNode;
  className?: string;
  direction?: "row" | "column";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  gap?: string | { base?: string; sm?: string; md?: string; lg?: string; xl?: string };
  padding?: string | { base?: string; sm?: string; md?: string; lg?: string; xl?: string };
  margin?: string | { base?: string; sm?: string; md?: string; lg?: string; xl?: string };
  motionProps?: MotionConfigProps;
} & Omit<React.ComponentPropsWithoutRef<E>, "as">;

export const Flex = forwardRef(
  <E extends ElementType = "div">(
    {
      as,
      children,
      className,
      direction = "row",
      wrap = "wrap",
      justify = "center",
      align = "center",
      gap = "4",
      padding = { base: "8" },
      margin = { base: "8" },
      motionProps,
      ...rest
    }: FlexProps<E> & MotionConfigProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const Component = motionProps ? MotionDiv : as || "div";

    const flexClasses = cn(
      "flex",
      direction === "row" ? "flex-row" : "flex-col",
      wrap && `flex-${wrap}`,
      justify && `justify-${justify}`,
      align && `items-${align}`,
      gap &&
        (typeof gap === "string"
          ? `gap-${gap}`
          : `gap-${gap.base ?? "4"} sm:gap-${gap.sm ?? gap.base ?? "4"} md:gap-${gap.md ?? gap.base ?? "4"} lg:gap-${gap.lg ?? gap.base ?? "4"} xl:gap-${gap.xl ?? gap.base ?? "4"}`),
      className
    );

    return (
      <Component ref={ref} className={clsx(flexClasses, padding, margin)} {...rest}>
        {children}
      </Component>
    );
  }
);

Flex.displayName = "Flex";
