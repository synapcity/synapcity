import { format } from "date-fns";
import { Clock, RefreshCcw } from "lucide-react";

interface MetaProps {
  createdAt?: string;
  updatedAt?: string;
}

export function StackedMeta({ createdAt, updatedAt }: MetaProps) {
  const exactCreated = createdAt && format(new Date(createdAt), "MMM d, yyyy, h:mm a");
  const exactUpdated = updatedAt && format(new Date(updatedAt), "MMM d, yyyy, h:mm a");

  return (
    <div className="flex flex-col gap-4 text-gray-500 text-xs">
      {createdAt && (
        <div className="group flex-1 flex gap-2">
          <Clock />
          <span className="group-hover:hidden block">Created</span>
          <span className="hidden group-hover:block whitespace-nowrap">{exactCreated}</span>
        </div>
      )}
      {updatedAt && (
        <div className="group flex-1 flex gap-2">
          <RefreshCcw />
          <span className="group-hover:hidden block" >Updated</span>
          <span className="hidden group-hover:block whitespace-nowrap">{exactUpdated}</span>
        </div>
      )}
    </div>
  );
}
