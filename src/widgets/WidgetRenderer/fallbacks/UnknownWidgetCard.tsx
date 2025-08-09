import { Card } from "@/landing-page/components";
import { cn } from "@/utils";
import { Wrench } from "lucide-react";

export function UnknownWidgetCard({
  text = "Unknown widget",
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <Card className={cn("h-full w-full p-4 flex items-center justify-center gap-2", className)}>
      <Wrench className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">{text}</span>
    </Card>
  );
}
