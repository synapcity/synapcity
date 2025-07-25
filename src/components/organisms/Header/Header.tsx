'use client'

import dynamic from 'next/dynamic'
import { cn } from '@/utils'
import { useUIStore } from '@/stores'
import { useEffect, useRef } from 'react'

const TopNavMenu = dynamic(
  () =>
    import(
      '@/components/menus/navigation/TopNavMenu/TopNavMenu'
    ).then((mod) => mod.TopNavMenu),
  { ssr: false }
)

export const Header = () => {
  const userPanel = useUIStore((s) => s.components.userPanel)
  const header = useUIStore((s) => s.components.header)
  const isSiteFocused = useUIStore((s) => s.isSiteFocus)
  const setCompState = useUIStore((s) => s.setCompState)
  const getCompState = useUIStore((s) => s.getCompState)

  const isLocked = userPanel ? getCompState("userPanel", "isLocked") : false
  const isPanelOpen = userPanel ? getCompState("userPanel", "isVisible") : false
  const isHeaderVisible = header ? getCompState("header", "isVisible") : true


  const shouldHide = isSiteFocused || (isLocked && isPanelOpen)

  useEffect(() => {
    setCompState(
      'header',
      'isVisible',
      !shouldHide
    )
  }, [shouldHide, setCompState])

  const timeoutRef = useRef<number>(0)
  const showHeader = () => {
    window.clearTimeout(timeoutRef.current)
    setCompState('header', 'isVisible', true)
  }
  const hideHeaderDelayed = () => {
    if (!shouldHide) return
    timeoutRef.current = window.setTimeout(() => {
      setCompState('header', 'isVisible', false)
    }, 2000)
  }

  return (
    <div className="w-full">
      <header
        style={{ '--header-height': '4rem' } as React.CSSProperties}
        className={cn(
          // 'sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border shadow-sm flex items-center transition-[height] duration-300',
          "sticky top-0 z-[100] backdrop-blur bg-background/80 text-foreground transition-shadow px-4 py-1.5 @container",
          {
            'h-2': !isHeaderVisible,
            'h-[var(--header-height)]': isHeaderVisible,
          }
        )}
        onMouseEnter={showHeader}
        onMouseLeave={hideHeaderDelayed}
      >
        <TopNavMenu />
      </header>
    </div>
  )
}
