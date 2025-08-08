"use client";

import { useRef } from "react";
import { Scroll as ScrollContainer } from "../containers"
import { BaseProps } from "@/landing-page/types";

type CardContentProps = {
  collapsible: boolean;
  visible: boolean;
  children: React.ReactNode;
} & BaseProps;

export const CardContent = ({ collapsible, visible, children, ...props }: CardContentProps) => {
  const scrollRef = useRef(null)
  if (collapsible && !visible) return null
  return (
    <ScrollContainer
      ref={scrollRef}
      direction="vertical"
      dragScroll
      showProgressBar
      snap
      {...props}
    >
      {children}
    </ScrollContainer>
  )
}