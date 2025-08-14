"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/utils";
import { LinkButton, Toggle } from "@/components/atoms";

import type { ButtonSize, ButtonVariant } from "@/components/atoms/buttons/variants";
import type { ToggleSize, ToggleVariant } from "@/components/atoms/ui/UIToggle";
import { useState } from "react";
import { DemoLogin } from "@/components/auth";

export type ToggleOrButtonVariant = {
  active?: ButtonVariant | ToggleVariant;
  inactive?: ButtonVariant | ToggleVariant;
};
interface Props {
  id: string;
  href?: string;
  label?: string;
  icon?: string;
  tooltip?: string;
  isIconOnly?: boolean;
  isToggle?: boolean;
  isActive?: boolean;
  source?: "lucide" | "iconify";
  onClick?: () => void;
  className?: string;
  activeClassName?: string;
  variant?: ToggleOrButtonVariant;
  size?: ButtonSize | ToggleSize;
}

export function NavLink({
  id,
  href,
  label,
  icon,
  tooltip,
  source = "lucide",
  isIconOnly = false,
  isToggle = false,
  isActive,
  onClick,
  className,
  activeClassName,
  variant = { active: "outline", inactive: "ghost" },
  size = "md",
}: Props) {
  const [active, setActive] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    onClick?.();
    if (href?.startsWith("#")) {
      e.preventDefault();
      return;
    }
    if (!isActive && !isToggle && href) router.push(href);
  };

  const sharedProps = {
    icon,
    tooltip,
    source,
    isIconOnly,
    onClick: handleClick,
    className: cn("font-normal", className, isActive && activeClassName),
  };

  if (id === "demo" || id === "login") {
    const { onClick: _handleClick, ...rest } = sharedProps;
    return (
      <DemoLogin asChild={false} {...rest}>
        {label}
      </DemoLogin>
    );
  }

  return isToggle && onClick ? (
    <Toggle
      pressed={isActive}
      aria-pressed={isActive}
      variant={(isActive ? variant.active : variant.inactive) as ToggleVariant}
      size={size as ToggleSize}
      {...sharedProps}
    >
      {label}
    </Toggle>
  ) : (
    href && (
      <LinkButton
        href={href}
        variant={(isActive ? variant.active : variant.inactive) as ButtonVariant}
        aria-current={isActive ? "page" : undefined}
        prefetch={active ? null : false}
        onMouseEnter={() => setActive(true)}
        {...sharedProps}
      >
        {label}
      </LinkButton>
    )
  );
}
