import { cn } from "@/landing-page/lib/utils";
import { ElementType, ReactNode } from "react";

type ResponsiveValue<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T };

type StackProps<E extends ElementType = "div"> = {
  as?: E;
  children: ReactNode;
  className?: string;

  gap?: ResponsiveValue<string>;
  align?: ResponsiveValue<"start" | "center" | "end" | "stretch">;
  justify?: ResponsiveValue<"start" | "center" | "end" | "between" | "around" | "evenly">;
  center?: boolean;
  wrap?: boolean;
  spaceBetween?: boolean;
  padding?: string;
} & Omit<React.ComponentPropsWithoutRef<E>, "as">;

function getResponsiveClasses<T extends string>(
  prefix: string,
  value?: ResponsiveValue<T>
): string[] {
  if (!value) return [];

  if (typeof value === "string") {
    return [`${prefix}-${value}`];
  }

  return Object.entries(value).map(([breakpoint, val]) =>
    breakpoint === "base" ? `${prefix}-${val}` : `${breakpoint}:${prefix}-${val}`
  );
}

export function Stack<E extends ElementType = "div">({
  as,
  children,
  className,
  gap = "8",
  align,
  justify,
  center,
  wrap,
  spaceBetween,
  padding,
  ...rest
}: StackProps<E>) {
  const Component = as || "div";

  const classes = cn(
    "flex flex-col",
    center && "items-center justify-center",
    wrap && "flex-wrap",
    spaceBetween && "justify-between",
    ...getResponsiveClasses("gap", gap),
    ...getResponsiveClasses("items", align),
    ...getResponsiveClasses("justify", justify),
    padding && `p-${padding}`,
    className
  );

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}

// function createStack(direction: "flex-row" | "flex-col") {
//   const StackComponent = function <E extends ElementType = "div">(props: StackProps<E>) {
//     const { className, ...rest } = props;
//     return <Stack {...(rest as StackProps<E>)} className={cn(direction, className || "")} />;
//   };

//   StackComponent.displayName = `Stack(${direction})`;

//   return StackComponent;
// }

// export const HStack = createStack("flex-row");
// export const VStack = createStack("flex-col");

export function HStack<E extends ElementType = "div">(props: StackProps<E>) {
  const { children, ...rest } = props;
  const { gap, className, ...restProps } = rest;
  return (
    <Stack<E> {...(restProps as StackProps<E>)} gap={gap} className={cn("flex-row", className)}>
      {children}
    </Stack>
  );
}

export function VStack<E extends ElementType = "div">(props: StackProps<E>) {
  const { className, ...rest } = props;
  return <Stack<E> {...(rest as StackProps<E>)} className={cn("flex-col", className)} />;
}

// export function HStack(props: Omit<React.ComponentProps<typeof Stack>, "as" | "className"> & { className?: string }) {
//   const { className, ...rest } = props;
//   return <Stack {...rest} className={cn("flex-row", className)}>{props.children}</Stack>;
// }

// export function VStack(props: Omit<React.ComponentProps<typeof Stack>, "as" | "className"> & { className?: string }) {
//   const { className, ...rest } = props;
//   return <Stack {...rest} className={cn("flex-col", className)} >{props.children}</Stack>;
// }

// Utility functions for handling spacing, margins, etc.

// export function getResponsiveClasses<T extends string>(
//   prefix: string,
//   value?: T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T }
// ): string[] {
//   if (!value) return [];

//   if (typeof value === "string") {
//     return [`${prefix}-${value}`];
//   }

//   return Object.entries(value).map(([breakpoint, val]) =>
//     breakpoint === "base" ? `${prefix}-${val}` : `${breakpoint}:${prefix}-${val}`
//   );
// }

// export function getSpacingClass(value: string | number) {
//   return `space-y-${value}`; // Example, use Tailwind's spacing utilities
// }
