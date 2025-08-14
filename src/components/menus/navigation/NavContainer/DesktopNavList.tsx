import { NavigationMenu, NavigationMenuList } from "@/components/atoms/ui/navigation-menu";
import { NavLinkData, NavLinkGroup } from "../Links/NavLinkGroup";
import { cn } from "@/landing-page/lib/utils";

export const DesktopNavList = ({
  links,
  className,
  activeClassName,
  menuClassName,
}: {
  links: NavLinkData[];
  className?: string;
  activeClassName?: string;
  menuClassName?: string;
}) => {
  return (
    <NavigationMenu className={cn("w-full", menuClassName)}>
      <NavigationMenuList>
        <NavLinkGroup items={links} className={className} activeClassName={activeClassName} />
      </NavigationMenuList>
    </NavigationMenu>
  );
};
