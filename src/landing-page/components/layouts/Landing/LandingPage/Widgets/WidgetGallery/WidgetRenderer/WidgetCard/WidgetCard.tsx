"use client"

import { CSSProperties, useRef } from "react";
import { useIntersectionObserver } from "@/landing-page/hooks";
import { Widget } from "@/landing-page/types";
import dynamic from "next/dynamic";
import clsx from "clsx";

const MotionDiv = dynamic(() => import("@/landing-page/components/ui/Motion/Motion").then((mod) => mod.MotionDiv), { ssr: true })

interface WidgetCardProps {
  widget: Widget;
  isLast?: boolean;
  onLoadMore?: () => void;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export const WidgetCard = ({
  widget,
  isLast,
  onLoadMore,
  className,
  style,
  children
}: WidgetCardProps) => {
  const cardRef = useRef(null);

  useIntersectionObserver(isLast ?? false, onLoadMore ?? (() => { }), cardRef);
  const Component = widget.component;

  return (
    <MotionDiv
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.03, rotate: 1, boxShadow: "0px 4px 20px rgba(0,0,0,0.3)" }}
      className={clsx("p-6 rounded-xl backdrop-blur-sm shadow-lg transition-all duration-300 flex justify-center items-center size-full", className)}
      style={style}
    >
      {Component ? (
        <Component
          style={{
            ...widget.props.style,
            width: widget.layout.w * 100,
            height: widget.layout.h * 100
          }}
          className="size-full"
          {...widget.props}
        />
      ) : children}
    </MotionDiv>
  );
};
