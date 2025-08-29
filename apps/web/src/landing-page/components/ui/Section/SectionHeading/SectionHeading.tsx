import clsx from "clsx";
import { MotionProps } from "framer-motion";
import { IconBaseProps } from "react-icons";
import { IconRenderer } from "@/landing-page/components";
import { BaseProps } from "@/landing-page/types";
import dynamic from "next/dynamic";

const MotionHeading = dynamic(
  () => import("@/landing-page/components/ui/Motion").then((mod) => mod.MotionH2),
  { ssr: true }
);

export interface SectionHeadingProps {
  motion?: MotionProps;
  iconClasses?: string;
  badgeClasses?: string;
  animated?: boolean;
  display?: boolean;
  badge?: React.ReactNode;
  icon?: React.ComponentType<IconBaseProps>;
  size?: "sm" | "md" | "lg" | "xl";
  center?: boolean;
  left?: boolean;
  children: React.ReactNode;
}
export const SectionHeading = ({
  display,
  center,
  left,
  children,
  animated,
  icon,
  iconClasses,
  badge,
  size = "md",
  badgeClasses,
  className,
  ...props
}: SectionHeadingProps & BaseProps) => {
  const Component = animated ? MotionHeading : display ? "h1" : "h2";
  const Icon = icon;
  const sizeClasses = {
    sm: "text-xl md:text-2xl",
    md: "text-2xl md:text-3xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-6xl md:text-7xl",
  };

  const textClass = center ? `text-center` : left ? `text-left` : `text-right`;
  return (
    <>
      {icon && (
        <div className={iconClasses}>
          <IconRenderer icon={icon ?? Icon} size="lg" />
        </div>
      )}

      <Component className={clsx("w-full", sizeClasses[size], textClass, className)} {...props}>
        {children}
      </Component>

      {badge && (
        <div className={clsx("size-full inline-flex justify-center items-center", badgeClasses)}>
          {badge}
        </div>
      )}
    </>
  );
};
