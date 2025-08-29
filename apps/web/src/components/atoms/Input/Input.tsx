import * as React from "react";
import { cn } from "@/utils";
import { Icon, IconButton, UIInput } from "..";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorText?: string[];
  helperText?: string;
  success?: boolean;
  isPassword?: boolean;
  icon?: string;
  isIconButton?: boolean;
  onIconClick?: () => void;
  onPasswordToggle?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      className,
      error = false,
      success = false,
      errorText,
      helperText,
      type = "text",
      isPassword = false,
      icon,
      isIconButton = false,
      onIconClick,
      onPasswordToggle,
      ...props
    },
    ref
  ) => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const inputType = isPassword && passwordVisible ? "text" : type;

    const handlePasswordToggle = () => {
      if (onPasswordToggle) onPasswordToggle();
      setPasswordVisible((prev) => !prev);
    };

    return (
      <div className="relative w-full flex flex-col">
        <UIInput
          ref={ref}
          type={inputType}
          data-slot="input"
          className={cn(error && "border-destructive", success && "border-success", className)}
          {...props}
        />

        {icon &&
          !isPassword &&
          (isIconButton ? (
            <span className="absolute right-0 top-0 flex justify-end items-center">
              <IconButton
                icon={icon}
                className="absolute right-2 top-1.5 hover:border-none"
                size="sm"
                variant="ghost"
                aria-label="Icon action"
                onClick={onIconClick}
              />
            </span>
          ) : (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Icon name={icon} className="w-4 h-4" />
            </span>
          ))}

        {isPassword && (
          <span className="absolute right-0 top-0 flex justify-end items-center">
            <IconButton
              icon={passwordVisible ? "Eye" : "EyeClosed"}
              className="absolute right-0 top-1.5 hover:border-none"
              iconSize={"xs"}
              onClick={handlePasswordToggle}
              size="xs"
              variant="ghost"
              aria-label="Toggle password visibility"
            />
          </span>
        )}

        {error && errorText?.length ? (
          errorText.map((text, idx) => (
            <p key={idx} className="mt-1 text-xs text-red-600">
              {text}
            </p>
          ))
        ) : helperText ? (
          <p className="mt-1 text-sm text-muted-foreground">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
