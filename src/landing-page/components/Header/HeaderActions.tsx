import Link from "next/link"

export const HeaderActions = () => {
  return (
    <div className="flex gap-4">
      <Link href="/login" className="no-underline hover:cursor-pointer border px-3 py-1.5 rounded-xl border-transparent hover:shadow-sm text-white hover:border-white shadow-white">
        Log In
      </Link>
      <Link href="/register" className="no-underline hover:cursor-pointer border px-3 py-1.5 rounded-xl border-transparent shadow-sm hover:border-white bg-white text-black hover:shadow-inner shadow-white">
        Sign Up
      </Link>
    </div>
  )
}