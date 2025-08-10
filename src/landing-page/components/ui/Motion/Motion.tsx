/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, MotionValue } from "framer-motion";
import { CSSProperties } from "react";

type MotionWrapperProps = {
  ref?: React.Ref<HTMLElement>;
  children: React.ReactNode;
  className?: string;
  initial?:
    | boolean
    | import("framer-motion").TargetAndTransition
    | import("framer-motion").VariantLabels;
  animate?:
    | boolean
    | import("framer-motion").TargetAndTransition
    | import("framer-motion").VariantLabels;
  exit?: import("framer-motion").TargetAndTransition | import("framer-motion").VariantLabels;
  transition?: object;
  whileHover?: import("framer-motion").TargetAndTransition | import("framer-motion").VariantLabels;
  whileTap?: import("framer-motion").TargetAndTransition | import("framer-motion").VariantLabels;
  style?: CSSProperties | { [key: string]: MotionValue<any> };
  onHoverStart?: (event: MouseEvent, info: import("framer-motion").EventInfo) => void;
  onHoverEnd?: (event: MouseEvent, info: import("framer-motion").EventInfo) => void;
  onClick?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  variants?: import("framer-motion").Variants;
};

export const MotionDiv = ({
  children,
  ...props
}: MotionWrapperProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return <motion.div {...props}>{children}</motion.div>;
};
export const MotionSection = ({ children, ...props }: MotionWrapperProps) => {
  return <motion.section {...props}>{children}</motion.section>;
};
export const MotionP = ({
  children,
  ...props
}: Omit<MotionWrapperProps, "whileTap" | "whileHover"> & {
  ref?: React.Ref<HTMLParagraphElement>;
}) => {
  return <motion.p {...props}>{children}</motion.p>;
};
export const MotionSpan = ({ children, ...props }: MotionWrapperProps) => {
  return <motion.span {...props}>{children}</motion.span>;
};
export const MotionButton = ({
  children,
  ...props
}: MotionWrapperProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return <motion.button {...props}>{children}</motion.button>;
};
export const MotionH2 = ({
  children,
  ...props
}: MotionWrapperProps & { ref?: React.Ref<HTMLHeadingElement> }) => {
  return <motion.h2 {...props}>{children}</motion.h2>;
};
