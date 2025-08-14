"use client";

import * as React from "react";
import { UIToggle, type ToggleProps as UIToggleProps } from "@/components/atoms";
import { cn } from "@/utils";

export interface BaseToggleProps extends Omit<UIToggleProps, "onPressedChange" | "pressed"> {
  children: React.ReactNode;
  inactiveChildren?: React.ReactNode;
  inactiveClasses?: string;
  initialPressed?: boolean;
  pressed?: boolean;
  onChange?: (pressed: boolean) => void;
  activeLabel?: string;
  inactiveLabel?: string;
  className?: string;
}

export const BaseToggle: React.FC<BaseToggleProps> = ({
  children,
  inactiveChildren,
  inactiveClasses,
  initialPressed = false,
  pressed,
  onChange,
  activeLabel,
  inactiveLabel,
  className,
  ...toggleProps
}) => {
  const [isPressed, setIsPressed] = React.useState(pressed ?? initialPressed);

  React.useEffect(() => {
    if (typeof pressed === "boolean") setIsPressed(pressed);
  }, [pressed]);

  const handleChange = React.useCallback(
    (value: boolean) => {
      if (pressed === undefined) setIsPressed(value);
      onChange?.(value);
    },
    [onChange, pressed]
  );

  const content = isPressed ? children : (inactiveChildren ?? children);

  const iconOnly =
    React.isValidElement(content) && typeof (content.props?.children ?? "") === "undefined";

  const ariaLabel = iconOnly ? (isPressed ? activeLabel : inactiveLabel) : undefined;

  const renderContent = React.isValidElement(content)
    ? React.cloneElement(content as React.ReactElement, {
        className: cn(
          "inline-flex items-center justify-center",

          "[&>*]:pointer-events-none",
          !isPressed && inactiveClasses,
          content.props?.className
        ),
      })
    : content;

  return (
    <UIToggle
      {...toggleProps}
      className={cn("whitespace-nowrap", className)}
      pressed={isPressed}
      onPressedChange={handleChange}
      aria-label={ariaLabel}
    >
      {renderContent}
    </UIToggle>
  );
};
