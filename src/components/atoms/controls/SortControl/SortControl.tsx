import { SortKeyDropdown } from "./SortKeyDropdown";
import { SortDirectionToggle } from "./SortDirectionToggle";

export type SortKey = "updatedAt" | "createdAt" | "name";
export type SortDir = "asc" | "desc";
interface SortControlProps {
  sortKey: SortKey;
  sortDir: SortDir;
  onKeyChange: (k: SortKey) => void;
  onDirToggle: () => void;
}

export function SortControl({ sortKey, sortDir, onKeyChange, onDirToggle }: SortControlProps) {
  return (
    <div className="flex items-center gap-2">
      <SortKeyDropdown sortKey={sortKey} onChange={onKeyChange} />
      <SortDirectionToggle dir={sortDir} onToggle={onDirToggle} />
    </div>
  );
}
