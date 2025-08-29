import { CardComponent as Card } from "@/landing-page/components/ui/CardComponent/CardComponent";
import { BaseProps } from "@/landing-page/types";
import { NotebookPen } from "lucide-react";

export const NoteWidget = ({
  title,
  content,
  ...props
}: { title: string; content: string } & BaseProps) => {
  return (
    <Card
      title={title}
      icon={NotebookPen}
      className="rounded-2xl bg-neutral-950 text-neutral-200 justify-start items-start size-full"
      {...props}
    >
      <textarea
        value={content}
        readOnly
        placeholder="Type here..."
        className="flex-1 bg-neutral-900 rounded p-2 text-sm text-neutral-100 size-full"
      />
    </Card>
  );
};
