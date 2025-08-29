/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeOff, XCircleIcon } from "lucide-react";
import { Icon } from "@/components";
import clsx from "clsx";

export function getInputIcon({
  type,
  visible,
  readOnly,
  disabled,
  showReset,
  toggleVisible,
  icon,
  label,
  onReset,
  onToggle,
}: {
  type: string;
  visible: boolean;
  readOnly: boolean;
  disabled: boolean;
  showReset?: boolean;
  toggleVisible?: boolean;
  icon?: any;
  name: string;
  label?: string;
  onReset: () => void;
  onToggle: () => void;
}) {
  if (readOnly) return null;

  const iconStyles = clsx("text-gray-500 transition", {
    "cursor-pointer": !disabled,
    "opacity-50": disabled,
  });

  if (showReset) {
    return (
      <Icon
        icon={XCircleIcon}
        onClick={onReset}
        className={iconStyles}
        aria-label={`Reset ${label || "input"}`}
      />
    );
  }

  if (toggleVisible || type === "password") {
    return (
      <Icon
        icon={visible ? EyeOff : Eye}
        onClick={onToggle}
        className={iconStyles}
        aria-label={`Toggle visibility for ${label || "input"}`}
      />
    );
  }

  if (icon) {
    return <Icon icon={icon} className={iconStyles} aria-label={label || "input icon"} />;
  }

  return null;
}
