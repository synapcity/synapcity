import { ReactNode, ElementType, forwardRef } from "react";
import { MotionDiv, MotionSection } from "@/landing-page/components";
import { MotionProps } from "framer-motion";
import { BaseProps } from "@/landing-page/types";
import clsx from "clsx";

export type ContainerProps<E extends ElementType = "div"> = {
  as?: E;
  children?: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
  padding?: string;
  motion?: MotionProps;
  center?: boolean;
  left?: boolean;
} & Omit<React.ComponentPropsWithoutRef<E>, "as"> &
  BaseProps;

export const Container = forwardRef(
  <E extends ElementType = "div">(
    {
      as,
      children,
      className,
      maxWidth = "7xl",
      padding = "8",
      center,
      left,
      motion,
      ...rest
    }: ContainerProps<E>,
    ref: React.Ref<HTMLElement>
  ) => {
    const Component = motion ? (as === "section" ? MotionSection : MotionDiv) : as || "div";
    const paddingClass = center ? `px-${padding}` : left ? `pr-${padding}` : `pl-${padding}`;
    const marginClass = center ? `mx-auto` : left ? `mr-auto` : `ml-auto`;
    const classes = clsx(`max-w-${maxWidth}`, paddingClass, marginClass, className);

    return (
      <Component ref={ref} className={classes} motion={motion} {...rest}>
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";
