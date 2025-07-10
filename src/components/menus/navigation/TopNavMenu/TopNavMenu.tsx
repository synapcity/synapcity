'use client';

import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/atoms/ui/navigation-menu';
import dynamic from 'next/dynamic';
import { Logo } from '@/components/atoms/Logo';
import { InboxTrigger } from '@/components/atoms/triggers';
import { DarkModeSwitch } from '@/components/atoms/DarkModeSwitch';
import { Separator } from '@/components/atoms/ui/separator';
import { useThemeStore } from '@/stores';
import { ThemeSheet } from '@/components/theme';
import { AuthLinks } from '../Links/AuthLinks';

const links = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/notes', label: 'Notes' },
  { href: '/libraries', label: 'Libraries' },
  { href: '/settings', label: 'Settings' },
];

const NavMenuLink = dynamic(() => import('@/components/menus/navigation/NavItem/NavItem').then((mod) => mod.NavMenuLink), {
  ssr: true,
});

export function TopNavMenu() {
  const toggleMode = useThemeStore(state => state.toggleGlobalMode)

  const globalPrefs = useThemeStore(state => state.globalPreferences)
  const mode = globalPrefs.mode
  return (
    <div className="w-full border-b bg-[var(--background)] text-[var(--foreground)] shadow-sm py-2 flex justify-center items-center px-4 gap-4">
      <Logo />
      <NavigationMenu className="mx-auto w-full flex justify-between items-center">
        <NavigationMenuList>
          <ul className="flex items-center justify-between w-full gap-1 transition-all duration-200 ease-linear">
            {links.map((link, idx) => {
              return (
                <NavMenuLink
                  key={link.href + idx}
                  title={link.label}
                  href={link.href}
                />
              )
            })}
          </ul>
        </NavigationMenuList>
      </NavigationMenu>

      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <div className="flex gap-2 items-center">
        <InboxTrigger />
        <ThemeSheet scope="global" />
      </div>
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <DarkModeSwitch key={mode} value={mode} onChange={() => toggleMode()} />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <AuthLinks />
    </div >
  );
}