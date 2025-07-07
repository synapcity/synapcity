"use client"

import {
  Sheet as UISheet,
  SheetTrigger as UISheetTrigger,
  SheetContent as UISheetContent,
  SheetHeader as UISheetHeader,
  SheetTitle as UISheetTitle,
  SheetDescription as UISheetDescription,
  SheetFooter as UISheetFooter,
  SheetClose as UISheetClose,
} from "@/components/atoms/ui/sheet";
import * as React from "react"
import { Button } from "@/components/atoms"
import { cn } from "@/utils"
// import dynamic from "next/dynamic"

// const UISheet = dynamic(() => import("@/components/atoms/ui/sheet").then((mod) => mod.Sheet), {
//   ssr: true
// })
// const UISheetTrigger = dynamic(() => import("@/components/atoms/ui/sheet").then((mod) => mod.SheetTrigger), {
//   ssr: true
// })
// const UISheetContent = dynamic(() => import("@/components/atoms/ui/sheet").then((mod) => mod.SheetContent), { ssr: true })
// const UISheetHeader = dynamic(() => import("@/components/atoms/ui/sheet").then((mod) => mod.SheetHeader), { ssr: true })
// const UISheetTitle = dynamic(() => import("@/components/atoms/ui/sheet").then((mod) => mod.SheetTitle), { ssr: true })
// const UISheetDescription = dynamic(() => import("@/components/atoms/ui/sheet").then((mod) => mod.SheetDescription), { ssr: true })
// const UISheetFooter = dynamic(() => import("@/components/atoms/ui/sheet").then((mod) => mod.SheetFooter), { ssr: true })
// const UISheetClose = dynamic(() => import("@/components/atoms/ui/sheet").then((mod) => mod.SheetClose), { ssr: true })

export interface DrawerProps {
  trigger?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  showCloseButton?: boolean
  showFooterClose?: boolean
  className?: string
  showTitle?: boolean
  showDescription?: boolean
}

export const Drawer: React.FC<DrawerProps> = ({
  trigger,
  title,
  description,
  children,
  footer,
  side = "right",
  open,
  defaultOpen,
  onOpenChange,
  showCloseButton = true,
  showFooterClose = false,
  className,
  showTitle = false,
  showDescription = false,
}) => {
  return (
    <UISheet open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <UISheetTrigger asChild>{trigger}</UISheetTrigger>}
      <UISheetContent side={side} className={cn("p-0", className)}>
        <UISheetHeader className={cn("border-b px-4 py-3", { "sr-only": !showTitle && !showDescription })}>
          <UISheetTitle className={cn({ "sr-only": !showTitle })}>
            {title ?? "Drawer"}
          </UISheetTitle>
          <UISheetDescription className={cn({ "sr-only": !showDescription })}>
            {description ?? ""}
          </UISheetDescription>
        </UISheetHeader>

        <div className="flex-1 overflow-auto px-4 py-4">{children}</div>

        {(footer || showFooterClose) && (
          <UISheetFooter className="border-t px-4 py-3">
            {footer}
            {showFooterClose && (
              <UISheetClose asChild>
                <Button data-testid="footer-close-button" variant="outline">Close</Button>
              </UISheetClose>
            )}
          </UISheetFooter>
        )}

        {showCloseButton && !footer && (
          <UISheetClose className="sr-only">Close</UISheetClose>
        )}
      </UISheetContent>
    </UISheet>
  )
}

Drawer.displayName = "Drawer"
