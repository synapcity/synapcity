import {
  Avatar as BaseAvatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { cn } from "@/utils";
import { Icon } from "../Icon";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<AvatarSize, string> = {
  sm: "h-6 w-6 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  fallbackText?: string;
  fallbackIcon?: { name: string; source?: "lucide" | "iconify" };
  status?: "online" | "offline" | "busy" | "away";
  ring?: boolean;
  className?: string;
}

/**
 * A custom Avatar component extending shadcn-ui's Avatar.
 */
export const Avatar = ({
  src,
  alt,
  size = "md",
  fallbackText,
  fallbackIcon,
  status,
  ring = false,
  className = "",
}: AvatarProps) => {
  const sizeClass = sizeMap[size];

  const statusClass = status
    ? {
      online: "bg-green-500",
      offline: "bg-gray-400",
      busy: "bg-red-500",
      away: "bg-yellow-400",
    }[status]
    : null;

  return (
    <div className="relative inline-block">
      <BaseAvatar
        className={cn(sizeClass, ring && "ring-2 ring-ring", className)}
      >
        {src && <AvatarImage src={src} alt={alt} />}
        <AvatarFallback className="flex items-center justify-center">
          {fallbackIcon ? (
            <Icon
              name={fallbackIcon.name}
              source={fallbackIcon.source}
              size={16}
              className="text-muted-foreground"
            />
          ) : (
            fallbackText?.slice(0, 2).toUpperCase()
          )}
        </AvatarFallback>
      </BaseAvatar>

      {statusClass && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border-2 border-background",
            statusClass
          )}
        />
      )}
    </div>
  );
};

