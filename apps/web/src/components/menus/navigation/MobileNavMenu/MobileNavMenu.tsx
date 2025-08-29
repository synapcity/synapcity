"use client";

import { NavLinkGroup } from "../Links/NavLinkGroup";
import { MobileDropdown } from "../../dropdown";
import { mainNavItems } from "../navigationMocks";

export function MobileNavMenu() {
  return (
    <MobileDropdown
      trigger={{ icon: "Menu", label: "Menu" }}
      value="mobile-nav"
      className="md:hidden max-w-md"
    >
      <NavLinkGroup
        items={mainNavItems.map((item) => ({
          ...item,
          isIconOnly: false,
        }))}
        direction="vertical"
        className="px-2 pt-2 space-y-2"
        activeClassName="font-semibold text-accent"
      />
    </MobileDropdown>
  );
}
