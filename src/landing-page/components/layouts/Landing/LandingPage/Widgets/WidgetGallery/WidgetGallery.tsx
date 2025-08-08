"use client"
import * as React from "react";
import { useWidgetGalleryController, useWidgets } from "@/landing-page/hooks";
import { WidgetRenderer } from "./WidgetRenderer";
import { containerVariants } from "@/landing-page/lib/variants";
import { Scroll as ScrollContainer, MotionDiv, MarqueeScroller } from "@/landing-page/components";
import { useRef } from "react";

export const WidgetGallery = () => {
  const {
    widgets,
    loading,
    x,
    controls,
    start,
    stop,
  } = useWidgetGalleryController();
  const { loadMore } = useWidgets();
  const scrollRef = useRef(null)

  const handleClick = React.useCallback(() => stop(), [stop]);
  const handleHoverLeave = React.useCallback(() => start(), [start]);

  console.log("x", x)


  return (
    <MotionDiv
      onClick={handleClick}
      onMouseLeave={handleHoverLeave}
      className="flex gap-6 md:px-4 size-full py-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{
        duration: 0.3
      }}
    >

      <MotionDiv
        animate={controls}
        style={{ x }}
        className="flex size-full justify-center items-center gap-16"
      >
        <ScrollContainer
          ref={scrollRef}
          direction="horizontal"
          dragScroll
          showProgressBar
          snap
        >
          <MarqueeScroller>
            {[...widgets, ...widgets].map((widget, index) => {
              const isLast = index === (widgets.length * 1.5) - 1;
              return (
                <WidgetRenderer
                  key={widget.id + index}
                  widget={widget}
                  isLast={isLast}
                  onLoadMore={loadMore}
                />
              );
            })}
          </MarqueeScroller>
        </ScrollContainer>
      </MotionDiv>

      {loading && (
        <p className="text-center py-4 text-neutral-400">Loading...</p>
      )}
    </MotionDiv>
  );
};
