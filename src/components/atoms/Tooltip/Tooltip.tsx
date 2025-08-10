import {
  UITooltipProvider,
  UITooltip,
  UITooltipContent,
  UITooltipTrigger,
  UITooltipProps,
} from "@/components/atoms/ui";
import { cn } from "@/utils";

export interface TooltipProps extends UITooltipProps {
  children?: React.ReactNode;
  content?: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  delayDuration?: number;
  asChild?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Tooltip = ({
  children,
  content,
  trigger,
  delayDuration = 0,
  asChild = false,
  className = "",
  ...props
}: TooltipProps) => {
  const providerProps = {
    delayDuration: delayDuration || 700,
    open: props.open,
    defaultOpen: props.defaultOpen,
    onOpenChange: props.onOpenChange,
    disableHoverableContent: props.disableHoverableContent,
  };
  return (
    <UITooltipProvider {...providerProps}>
      <UITooltip {...providerProps} data-testid="tooltip-container" delayDuration={delayDuration}>
        <UITooltipTrigger data-testid="tooltip-trigger" asChild={asChild}>
          {trigger || children}
        </UITooltipTrigger>
        <UITooltipContent {...props}>
          <span
            data-testid="tooltip-content"
            data-side={props.side}
            data-align={props.align}
            className={cn("text-xs text-balance", className)}
          >
            {content}
          </span>
        </UITooltipContent>
      </UITooltip>
    </UITooltipProvider>
  );
};
