'use client'

import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/atoms/ui/navigation-menu'
import dynamic from 'next/dynamic'
import { Logo } from '@/components/atoms/Logo'
import { InboxTrigger } from '@/components/atoms/triggers'
import { DarkModeSwitch } from '@/components/atoms/DarkModeSwitch'
import { Separator } from '@/components/atoms/ui/separator'
import { useThemeStore, useUIStore } from '@/stores'
import { ThemeSheet } from '@/components/theme'
import { AuthLinks } from '../Links/AuthLinks'
import { cn } from '@/utils'
import { IconButton } from '@/components/atoms'
import { useShallow } from 'zustand/shallow'

const links = [
  { href: '/', label: 'Home' },
  { href: '/home/dashboards', label: 'Dashboards' },
  { href: '/home/notes', label: 'Notes' },
  { href: '/libraries', label: 'Libraries' },
  { href: '/settings', label: 'Settings' },
]

const NavMenuLink = dynamic(
  () =>
    import(
      '@/components/menus/navigation/NavItem/NavItem'
    ).then((mod) => mod.NavMenuLink),
  { ssr: true }
)

export function TopNavMenu() {
  const isSiteFocused = useUIStore(useShallow((s) => s.isSiteFocus))
  const header = useUIStore(useShallow((s) => s.components.header))
  const getCompState = useUIStore((s) => s.getCompState)

  const isHeaderVisible = header ? getCompState("header", "isVisible") : true

  const toggleFocus = useUIStore((s) => s.toggleSiteFocus)
  const toggleMode = useThemeStore((s) => s.toggleGlobalMode)
  const mode = useThemeStore((s) => s.globalPreferences.mode)

  return (
    <div
      className={cn(
        'w-full flex items-center justify-between px-4 py-2 text-[var(--foreground)] transition-opacity duration-300',
        {
          'opacity-0 -translate-y-full': !isHeaderVisible,
          'opacity-100 translate-y-0': isHeaderVisible && !isSiteFocused,
        }
      )}
    >
      <Logo />

      <NavigationMenu className="mx-auto w-full">
        <NavigationMenuList>
          <ul className="flex gap-4">
            {links.map((link) => (
              <NavMenuLink
                key={link.href}
                title={link.label}
                href={link.href}
              />
            ))}
          </ul>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-2 text-(--background)">
        <InboxTrigger />
        <ThemeSheet scope="global" triggerStyles="text-(--background)" />
        <IconButton
          icon={isSiteFocused ? 'eyeOff' : 'eye'}
          iconClassName={isSiteFocused ? "text-[var(--foreground)] bg-(--background)" : ""}
          onClick={toggleFocus}
          variant={isSiteFocused ? 'primary' : 'ghost'}
          aria-label="Toggle site focus mode"
        />
        <Separator orientation="vertical" className="h-4" />
        <DarkModeSwitch
          key={mode}
          value={mode}
          onChange={toggleMode}
        />
        <Separator orientation="vertical" className="h-4" />
        <AuthLinks />
      </div>
    </div>
  )
}
