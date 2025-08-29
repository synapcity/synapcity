"use client";

// import { LinkButton } from "@/components/atoms";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/atoms/ui/navigation-menu";
import { useNavLinkActive } from "@/hooks";
import { cn } from "@/utils";
import Link from "next/link";

export function NavMenuLink({ title, href }: { title: string; href: string }) {
  const isActive = useNavLinkActive(href);

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          // size="sm"
          aria-current={isActive ? "page" : undefined}
          data-active={isActive ? "true" : undefined}
          className={cn(navigationMenuTriggerStyle({ active: isActive }))}
        >
          {title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
