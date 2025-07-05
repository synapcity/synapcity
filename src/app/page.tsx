import { Button } from "@/components";
import { ThemeSheet } from "@/components/molecules/theme/ThemeSheet/ThemeSheet";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button variant="outline">Click me</Button>
      <ThemeSheet />
    </div>
  );
}
