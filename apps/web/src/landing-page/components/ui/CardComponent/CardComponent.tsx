"use client";

import dynamic from "next/dynamic";
import { IconRenderer } from "../IconRenderer";
import { IconBaseProps } from "react-icons";
import { PanelBottomCloseIcon, PanelTopCloseIcon } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { BaseProps } from "@/landing-page/types";
import { CardContent } from "./CardContent";

interface CardProps {
  icon?: React.ComponentType<IconBaseProps>;
  title: string;
  collapsible?: boolean;
  header?: React.ReactNode;
  children?: React.ReactNode;
}

const MotionDiv = dynamic(
  () => import("@/landing-page/components/ui/Motion/Motion").then((mod) => mod.MotionDiv),
  { ssr: true }
);
export const CardComponent = ({
  collapsible = false,
  icon,
  title,
  header,
  children,
  className,
  styles,
}: CardProps & BaseProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={clsx(
        "min-h-[250px] min-w-[300px] rounded-2xl flex flex-col justify-center text-sm",
        className
      )}
      onClick={
        collapsible
          ? () => {
              setIsOpen(!isOpen);
            }
          : undefined
      }
    >
      <MotionDiv
        // variants={item}
        whileHover={{
          scale: 1.05,
          rotate: 1,
          boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
        className={clsx(
          "group w-full h-full p-8 bg-black rounded-lg text-center text-gray-900 shadow-md flex flex-col justify-center items-center cursor-pointer"
        )}
      >
        <div className="w-full flex justify-between items-center mb-4">
          {icon && (
            <IconRenderer
              icon={icon}
              className={clsx("w-6 h-6 text-accent-500", { "opacity-100 scale-105": isOpen })}
            />
          )}
          <h4 className=" text-base leading-relaxed m-0">{title}</h4>
          {collapsible && (
            <button
              className={clsx("text-sm font-light", {
                "text-accent-600 text-xs opacity-50": isOpen,
              })}
            >
              {isOpen ? <PanelBottomCloseIcon /> : <PanelTopCloseIcon />}
            </button>
          )}
        </div>
        {header && header}
        <CardContent
          collapsible={collapsible}
          visible={collapsible ? isOpen : true}
          styles={styles}
        >
          {children}
        </CardContent>
      </MotionDiv>
    </div>
  );
};
