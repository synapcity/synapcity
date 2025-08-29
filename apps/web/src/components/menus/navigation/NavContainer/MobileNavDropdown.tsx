// "use client";

// import * as React from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { Dropdown } from "../../dropdown";
// import type { DropdownGroup, DropdownItem } from "../../dropdown";
// import type { NavLinkData } from "../Links/NavLinkGroup";
// import { Icon } from "@/components/atoms";
// import { cn } from "@/utils";

// /** require a non-empty label */
// function hasLabel(link: NavLinkData): link is NavLinkData & { label: string } {
//   return typeof link.label === "string" && link.label.trim().length > 0;
// }

// /** helper to determine active-ness */
// function isActivePath(pathname: string, href?: string) {
//   if (!href) return false;
//   // tweak to your routing taste:
//   // - exact: return pathname === href
//   // - startsWith section: return pathname === href || pathname.startsWith(href + "/")
//   return pathname === href || pathname.startsWith(href + "/");
// }

// /** group builder (same as you had, using only safe labeled links) */
// export const navToDropdownGroups = (links: NavLinkData[]): DropdownGroup[] => {
//   const safe = links.filter(hasLabel);
//   const main: DropdownItem[] = [];
//   const actions: DropdownItem[] = [];

//   for (const l of safe) {
//     const isAction =
//       !!l.onClick || l.variant?.inactive === "outline" || l.variant?.inactive === "link";
//     (isAction ? actions : main).push({
//       label: l.label,
//       icon: l.icon ?? undefined,
//     });
//   }

//   if (actions.length === 0) return main;
//   return [{ label: "Navigate", items: main }, "separator", { label: "Actions", items: actions }];
// };

// export function MobileNavDropdown({
//   links,
//   align = "end",
//   className,
// }: {
//   links: NavLinkData[];
//   align?: "start" | "center" | "end";
//   className?: string;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   // active link for trigger
//   const active = React.useMemo(
//     () => links.find((l) => isActivePath(pathname, l.href)) ?? links[0],
//     [links, pathname]
//   );

//   // Build groups, inject onSelect, and set `active: true` for the current route
//   const items: DropdownGroup[] = React.useMemo(() => {
//     const groups = navToDropdownGroups(links);

//     const withHandlers = groups.map((g) => {
//       if (g === "separator") return g;

//       if ("items" in g) {
//         return {
//           ...g,
//           items: g.items.map((it) => {
//             const link = links.find((l) => l.label === it.label);
//             const activeFlag = isActivePath(pathname, link?.href);
//             return {
//               ...it,
//               active: activeFlag,
//               onSelect: () => {
//                 if (link?.onClick) link.onClick();
//                 if (link?.href) router.push(link.href);
//               },
//             };
//           }),
//         };
//       }

//       // flat item
//       const link = links.find((l) => l.label === g.label);
//       const activeFlag = isActivePath(pathname, link?.href);
//       return {
//         ...g,
//         active: activeFlag,
//         onSelect: () => {
//           if (link?.onClick) link.onClick();
//           if (link?.href) router.push(link.href);
//         },
//       };
//     });

//     return withHandlers;
//   }, [links, pathname, router]);

//   return (
//     <Dropdown
//       align={align}
//       items={items}
//       trigger={{
//         variant: "ghost",
//         size: "sm",
//         children: (
//           <span className="inline-flex items-center gap-2">
//             {active?.icon && <Icon name={active.icon} />}
//             <span className="text-sm">{active?.label ?? "Menu"}</span>
//           </span>
//         ),
//       }}
//       className={cn(
//         {
//           "justify-self-end": align === "end",
//         },
//         className
//       )}
//     />
//   );
// }

"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Dropdown,
  type DropdownGroup,
  type DropdownItem,
} from "@/components/menus/dropdown/Dropdown";
import type { NavLinkData } from "../Links/NavLinkGroup";
import { Icon } from "@/components/atoms";
import { cn } from "@/utils";

/** Ensure we only use items with labels */
function hasLabel(link: NavLinkData): link is NavLinkData & { label: string } {
  return typeof link.label === "string" && link.label.trim().length > 0;
}

function isActivePath(pathname: string, href?: string) {
  if (!href) return false;
  return pathname === href || pathname.startsWith(href + "/");
}

/** Build groups from nav items (main vs actions) */
function navToDropdownGroups(links: NavLinkData[]): DropdownGroup[] {
  const safe = links.filter(hasLabel);
  const main: DropdownItem[] = [];
  const actions: DropdownItem[] = [];

  for (const l of safe) {
    const isAction =
      !!l.onClick || l.variant?.inactive === "outline" || l.variant?.inactive === "link";
    (isAction ? actions : main).push({
      label: l.label,
      icon: l.icon ?? undefined,
    });
  }

  if (actions.length === 0) return main;
  return [{ label: "Navigate", items: main }, "separator", { label: "Actions", items: actions }];
}

export function MobileNavDropdown({
  links,
  align = "end",
  wrapperClassName,
  triggerClassName = "ml-auto", // push the trigger to the end on mobile row
  contentClassName,
}: {
  links: NavLinkData[];
  align?: "start" | "center" | "end";
  /** place the trigger in your header layout (flex/grid) */
  wrapperClassName?: string;
  /** extra class merged into the trigger element */
  triggerClassName?: string;
  /** panel class */
  contentClassName?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const active = React.useMemo(
    () => links.find((l) => isActivePath(pathname, l.href)) ?? links[0],
    [links, pathname]
  );

  const items: DropdownGroup[] = React.useMemo(() => {
    const groups = navToDropdownGroups(links);

    const withHandlers = groups.map((g) => {
      if (g === "separator") return g;

      if ("items" in g) {
        return {
          ...g,
          items: g.items.map((it) => {
            const link = links.find((l) => l.label === it.label);
            const activeFlag = isActivePath(pathname, link?.href);
            return {
              ...it,
              active: activeFlag,
              onSelect: () => {
                if (link?.onClick) link.onClick();
                if (link?.href) router.push(link.href);
              },
            };
          }),
        };
      }

      const link = links.find((l) => l.label === g.label);
      const activeFlag = isActivePath(pathname, link?.href);
      return {
        ...g,
        active: activeFlag,
        onSelect: () => {
          if (link?.onClick) link.onClick();
          if (link?.href) router.push(link.href);
        },
      };
    });

    return withHandlers;
  }, [links, pathname, router]);

  return (
    <Dropdown
      align={align}
      items={items}
      className={wrapperClassName}
      contentClassName={contentClassName}
      trigger={{
        variant: "ghost",
        size: "sm",
        children: (
          <span className={cn("inline-flex items-center gap-2", triggerClassName)}>
            {active?.icon && <Icon name={active.icon} />}
            <span className="text-sm">{active?.label ?? "Menu"}</span>
          </span>
        ),
      }}
    />
  );
}
