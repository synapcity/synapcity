"use client";

import clsx from "clsx";

import { HeaderActions } from "./HeaderActions";
import dynamic from "next/dynamic";
import { NavMenu } from "./NavMenu";

const MotionDiv = dynamic(() => import("../ui/Motion").then((mod) => mod.MotionDiv), {
  ssr: false,
});

interface NavbarProps {
  isHovered: boolean;
}

export const Navbar = ({ isHovered }: NavbarProps) => {
  return (
    <MotionDiv
      className={clsx("flex-1", {
        flex: isHovered,
        hidden: !isHovered,
      })}
      animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6, ease: "linear" }}
    >
      <NavMenu />
      <HeaderActions />
    </MotionDiv>
  );
};
