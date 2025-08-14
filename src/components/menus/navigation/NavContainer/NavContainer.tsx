"use client";

import { NavLinkData } from "../Links/NavLinkGroup";
import { DesktopNavList } from "./DesktopNavList";
import { MobileNavDropdown } from "./MobileNavDropdown";

export const NavContainer = ({ links }: { links: NavLinkData[] }) => {
  return (
    <div className="flex-1">
      <div className="hidden md:block">
        <DesktopNavList links={links} />
      </div>
      <div className="md:hidden px-3 py-2 flex items-center justify-end">
        <MobileNavDropdown
          links={links}
          align="end"
          wrapperClassName="text-(--background)"
          triggerClassName="text-(--background) hover:text-(--foreground) active:text-(--foreground) ml-auto"
        />
      </div>
    </div>
  );
};
