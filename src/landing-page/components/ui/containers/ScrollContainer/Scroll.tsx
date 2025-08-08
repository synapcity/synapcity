"use client"

import { motion } from "framer-motion"
import { useState, forwardRef, useImperativeHandle, useRef } from "react"
import { useChildIntersectionObserver, useScrollProgress, useDragScroll } from "@/landing-page/hooks"
import clsx from "clsx"
import { BaseProps } from "@/landing-page/types"

type ScrollProps = {
  children: React.ReactNode
  direction?: "horizontal" | "vertical"
  dragScroll?: boolean
  onReachEnd?: () => void
  showProgressBar?: boolean
  snap?: boolean;
} & BaseProps

export type ScrollRef = {
  scrollToTop: () => void
  scrollToBottom: () => void
  scrollToIndex: (index: number) => void
}

export const Scroll = forwardRef<ScrollRef, ScrollProps>(({
  children, styles = {}, snap, direction = "vertical", className, onReachEnd, dragScroll = true, showProgressBar
}, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { currentIndex } = useChildIntersectionObserver(containerRef)

  useScrollProgress(containerRef, direction, onReachEnd, setScrollProgress)

  useDragScroll(containerRef, dragScroll)

  useImperativeHandle(ref, () => ({
    scrollToIndex: (index) => {
      const container = containerRef.current
      if (container) {
        const items = Array.from(container.children) as HTMLElement[]
        const target = index ? items[index] : items[currentIndex]
        if (target) {
          target.scrollIntoView({ behavior: "smooth", inline: "center", block: "center" })
        }
      }
    },
    scrollToTop: () => {
      containerRef.current?.scrollTo({ [direction === "horizontal" ? "left" : "top"]: 0, behavior: "smooth" })
    },
    scrollToBottom: () => {
      const el = containerRef.current
      if (el) {
        const maxScroll = direction === "horizontal"
          ? el.scrollWidth - (el.parentElement?.clientWidth || 0)
          : el.scrollHeight - (el.parentElement?.clientHeight ?? 0)
        el.scrollTo({ [direction === "horizontal" ? "left" : "top"]: maxScroll, behavior: "smooth" })
      }
    }
  }))

  const getScrollStyles = (direction: "horizontal" | "vertical") => {
    const base = "scroll-smooth size-full transition-all duration-300 ease-in-out scrollbar-hide flex flex-nowrap"
    const horizontalStyles = " overflow-x-auto overflow-y-hidden overscroll-x-contain space-y-4 mask-fade-horizontal"
    const verticalStyles = " overflow-y-auto overflow-x-hidden overscroll-y-contain space-x-4 nask-fade-vertical"
    const snapStyles = snap ? (direction === "horizontal" ? " snap-x snap-mandatory" : " snap-y snap-mandatory") : ""
    return base + (direction === "vertical" ? verticalStyles : horizontalStyles) + snapStyles
  }

  return (
    <>
      {showProgressBar && (
        <motion.div
          className="absolute top-0 left-0 h-1 bg-primary z-20"
          style={{ width: `${scrollProgress}%` }}
          layout
        />
      )}
      <div
        ref={containerRef}
        className={clsx(getScrollStyles(direction), className)}
        style={styles}
      >
        {children}
      </div>
    </>
  )
})

Scroll.displayName = "Scroll"
