export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <header className="border">Header</header>
      <main className="border">{children}</main>
      <footer className="border">Footer</footer>
    </div>
  );
};
