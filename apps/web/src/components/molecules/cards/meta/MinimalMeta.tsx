import { Tooltip } from "@/components/atoms/Tooltip";
import { formatDistanceToNow, format } from "date-fns";

interface MetaProps {
  createdAt: string;
  updatedAt: string;
}

export function MinimalMeta({ createdAt, updatedAt }: MetaProps) {
  const relative = formatDistanceToNow(new Date(updatedAt), { addSuffix: true });
  const exactUpdated = format(new Date(updatedAt), "MMM d, yyyy, h:mm a");
  const exactCreated = format(new Date(createdAt), "MMM d, yyyy, h:mm a");

  return (
    <div className="flex items-center text-xs  bg-(--background-200) text-(--foreground) gap-2">
      <div>
        <Tooltip content={`Updated: ${exactUpdated}\nCreated: ${exactCreated}`}>
          <span aria-label="last updated">{relative}</span>
        </Tooltip>
      </div>
    </div>
  );
}
