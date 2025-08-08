"use client"

import dynamic from "next/dynamic"
import { IconRenderer } from "../IconRenderer";
import { IconBaseProps } from "react-icons";
import { PanelBottomCloseIcon, PanelTopCloseIcon } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { BaseProps } from "@/landing-page/types";
import { CardContent } from "./CardContent";

interface CardProps {
  icon?: React.ComponentType<IconBaseProps>;
  title: string
  collapsible?: boolean;
  header?: React.ReactNode;
  children?: React.ReactNode;

}

const MotionDiv = dynamic(() => import("@/landing-page/components/ui/Motion/Motion").then((mod) => mod.MotionDiv), { ssr: true })
export const CardComponent = ({ collapsible = false, icon, title, header, children, className, styles }: CardProps & BaseProps) => {
  const [isOpen, setIsOpen] = useState(false)

  // const item = {
  //   hidden: {
  //     opacity: 0,
  //     x: 50,
  //   },
  //   visible: {
  //     opacity: 1,
  //     x: 0,
  //     transition: {
  //       duration: 0.6,
  //       ease: "easeOut",
  //     },
  //   },
  // }

  return (
    <div className={clsx("min-h-[250px] min-w-[300px] rounded-2xl flex flex-col justify-center text-sm hover:scale-105 transition-transform", className)}
      onClick={collapsible ? () => {
        setIsOpen(!isOpen);
      } : undefined}
    >
      <MotionDiv
        // variants={item}
        whileHover={{
          scale: 1.05,
          rotate: 1,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.3)"
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
        className={clsx("p-8 bg-black rounded-lg text-center text-white shadow-white hover:shadow-sm flex flex-col justify-center items-center hover:cursor-pointer size-full")}
      >

        <div
          className="w-full flex justify-between items-center mb-4"
        >
          {icon && (
            <IconRenderer icon={icon} className={clsx("w-6 h-6 text-accent-500", { "text-white opacity-100 scale-105": isOpen })} />
          )}
          <h4 className=" text-base leading-relaxed m-0">
            {title}
          </h4>
          {collapsible && (
            <button
              className={clsx("text-sm font-light", { "text-accent-600 text-xs opacity-50": isOpen })}
            >
              {isOpen ? <PanelBottomCloseIcon /> : <PanelTopCloseIcon />}
            </button>
          )}
        </div>
        {header && (header)}
        <CardContent collapsible={collapsible} visible={collapsible ? (isOpen) : true} styles={styles}>
          {children}
        </CardContent>
      </MotionDiv >
    </div >
  )
}