"use client"

import { useEffect, useState } from "react"

export const useChildIntersectionObserver = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  threshold: number = 0.8
) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          const index = Array.from(container.children).indexOf(visibleEntries[0].target as HTMLElement)
          if (index !== -1) {
            setCurrentIndex(index)
          }
        }
      },
      {
        root: container,
        threshold,
      }
    )

    Array.from(container.children).forEach((child) => observer.observe(child))

    return () => observer.disconnect()
  }, [containerRef, threshold])

  return { currentIndex }
}
