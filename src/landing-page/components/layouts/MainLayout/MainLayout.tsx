import { DarkModeToggle } from "@/landing-page/components/DarkModeToggle";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <header className="border">Header</header>
      <main className="border">{children}</main>
      <footer className="border">Footer</footer>
      <div className="absolute bottom-4 right-4 z-50">
        <DarkModeToggle />
      </div>
    </div>
  );
};
