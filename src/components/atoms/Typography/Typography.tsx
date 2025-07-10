import { cn } from "@/utils";
import type { HTMLAttributes, ElementType } from "react";
import { headingVariants, textVariants } from "./variants";

type HeadingVariant = keyof typeof headingVariants;
type TextVariant = keyof typeof textVariants;
type Variant = HeadingVariant | TextVariant;

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant;
  as?: ElementType;
  className?: string;
  children: React.ReactNode;
}

export const Typography = ({
  variant = "default",
  as,
  className,
  children,
  ...props
}: TypographyProps) => {
  const isHeading = variant in headingVariants;
  const Tag = as || (isHeading ? variant : "p") as ElementType;

  const styles = isHeading
    ? headingVariants[variant as HeadingVariant]
    : textVariants[variant as TextVariant];

  return (
    <Tag className={cn(styles, className)} {...props}>
      {children}
    </Tag>
  );
};
