export default function HomePage({ children }: { children: React.ReactNode; }) {
  return (
    <div className="min-h-screen size-full">
      <h1>Welcome to Home Page</h1>
      {children}
    </div>
  )
}