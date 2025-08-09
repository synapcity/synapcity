import { Card } from "@/landing-page/components";
import { PlugZap } from "lucide-react";

export function MissingWidget({ message }: { message: string }) {
  return (
    <Card className="h-full w-full p-4 flex items-center justify-center text-muted-foreground">
      <PlugZap className="h-4 w-4 mr-2" />
      <span className="text-sm">{message}</span>
    </Card>
  );
}
