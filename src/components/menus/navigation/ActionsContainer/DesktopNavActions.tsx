import { InboxToggle, ThemeToggle, VisibilityToggle, DarkModeToggle } from "@/components/atoms";
import { AuthLinks } from "../Links/AuthLinks";
import { Separator } from "@/components/atoms/ui/separator";

export const DesktopNavActions = () => {
  return (
    <div className="hidden md:flex items-center gap-2 text-(--background)">
      <InboxToggle />
      <ThemeToggle />
      <VisibilityToggle />
      <DarkModeToggle />
      <Separator orientation="vertical" className="h-4" />
      <AuthLinks />
    </div>
  );
};
