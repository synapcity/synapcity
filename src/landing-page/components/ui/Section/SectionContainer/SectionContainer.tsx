"use client";

import * as React from "react";
import { useInView } from "react-intersection-observer";
import { Container, ContainerProps } from "../../containers/Container/Container";
import { Flex, FlexProps } from "../../containers/Flex/Flex";
import { MotionProps } from "framer-motion";
import clsx from "clsx";

export type BaseProps = {
  className?: string;
  styles?: React.CSSProperties;
};

interface SectionProps {
  backgroundContent?: React.ReactNode;
  children: React.ReactNode;
  motion?: MotionProps;
  flexProps?: FlexProps;
}
export const SectionContainer = ({
  children,
  backgroundContent,
  flexProps,
  className,
  motion,
  ...props
}: SectionProps & ContainerProps & BaseProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.6,
  });

  return (
    <Container
      as="section"
      ref={ref}
      className={clsx("section-container", className)}
      motion={{
        ...motion,
        animate: { opacity: inView ? 1 : 0, y: inView ? 0 : 50 },
        transition: { duration: 1 },
        exit: { opacity: 0, y: 50 },
      }}
      maxWidth={"full"}
      padding={"0"}
      {...props}
    >
      {backgroundContent && <div className="absolute inset-0">{backgroundContent}</div>}
      {flexProps ? (
        <Flex className="mx-auto" {...flexProps}>
          {children}
        </Flex>
      ) : (
        <>{children}</>
      )}
    </Container>
  );
};
