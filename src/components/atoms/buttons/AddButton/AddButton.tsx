import { IconButton } from "../IconButton";
import { ButtonSize } from "../variants";

export default function AddButton({ size, onSubmit }: { size?: ButtonSize; onSubmit: () => void }) {
  return (
    <div
      data-testid="add-button-wrapper"
      className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
    >
      <IconButton
        icon="Plus"
        tooltip="Add Tab"
        size={size}
        onClick={onSubmit}
      />
    </div>
  );
}
