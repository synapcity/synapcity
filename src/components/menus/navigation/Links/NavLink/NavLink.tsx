"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/utils";
import { LinkButton, Toggle } from "@/components/atoms";

import type { ButtonSize, ButtonVariant } from "@/components/atoms/buttons/variants";
import type { ToggleSize, ToggleVariant } from "@/components/atoms/ui/toggle";

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
  variant?: ToggleOrButtonVariant
  size?: ButtonSize | ToggleSize;
}

export function NavLink({
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
  variant = { active: "default", inactive: "outline" },
  size = "md",
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    onClick?.();
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
  ) : href && (
    <LinkButton
      href={href}
      variant={(isActive ? variant.active : variant.inactive) as ButtonVariant}
      aria-current={isActive ? "page" : undefined}
      {...sharedProps}
    >
      {label}
    </LinkButton>
  );
}
