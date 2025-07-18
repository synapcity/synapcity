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
  const isLocked = useUIStore((s) => s.components.userPanel.isLocked)
  const isPanelOpen = useUIStore((s) => s.components.userPanel.isVisible)
  const isSiteFocused = useUIStore((s) => s.isSiteFocus)
  const isHeaderVisible = useUIStore((s) => s.components.header.isVisible)
  const setCompState = useUIStore((s) => s.setCompState)

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
        style={{ '--header-height': '3.5rem' } as React.CSSProperties}
        className={cn(
          'sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border shadow-sm flex items-center transition-[height] duration-300',
          {
            'h-4': !isHeaderVisible,
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
