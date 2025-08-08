"use client"

import { useEffect } from "react"

export const useDragScroll = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled) return

    const el = containerRef.current
    if (!el) return

    let isDown = false
    let startX = 0, startY = 0, scrollLeft = 0, scrollTop = 0

    const startDrag = (e: MouseEvent) => {
      isDown = true
      el.classList.add("dragging")
      startX = e.pageX - el.offsetLeft
      startY = e.pageY - el.offsetTop
      scrollLeft = el.scrollLeft
      scrollTop = el.scrollTop
    }

    const endDrag = () => {
      isDown = false
      el.classList.remove("dragging")
    }

    const onDrag = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      const y = e.pageY - el.offsetTop
      const walkX = (x - startX) * -1
      const walkY = (y - startY) * -1
      el.scrollLeft = scrollLeft + walkX
      el.scrollTop = scrollTop + walkY
    }

    el.addEventListener("mousedown", startDrag)
    el.addEventListener("mouseleave", endDrag)
    el.addEventListener("mouseup", endDrag)
    el.addEventListener("mousemove", onDrag)

    return () => {
      el.removeEventListener("mousedown", startDrag)
      el.removeEventListener("mouseleave", endDrag)
      el.removeEventListener("mouseup", endDrag)
      el.removeEventListener("mousemove", onDrag)
    }
  }, [containerRef, enabled])
}
