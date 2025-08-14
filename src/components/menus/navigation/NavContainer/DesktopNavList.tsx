import { NavigationMenu, NavigationMenuList } from "@/components/atoms/ui/navigation-menu";
import { NavMenuLink } from "../NavItem";
import { NavLinkData, NavLinkGroup } from "../Links/NavLinkGroup";

export const DesktopNavList = ({ links }: { links: NavLinkData[] }) => {
  return (
    <NavigationMenu className="mx-auto w-full">
      <NavigationMenuList>
        <NavLinkGroup items={links} />
      </NavigationMenuList>
    </NavigationMenu>
  );
};
