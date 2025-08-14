import { User } from "@/stores";
import { cookies } from "next/headers";

const DEMO_COOKIE = "demo_auth";

export async function hasDemoSession(): Promise<boolean> {
  const store = await cookies();
  return store.has(DEMO_COOKIE);
}

// export async function getDemoUser() {
//   if (!(await hasDemoSession())) return null;
//   return { id: "1", name: "Hanaa", email: "hanaa@mail.com", username: "hanaa" };
// }

export async function getDemoUser(): Promise<User | null> {
  const store = await cookies();
  const c = store.get(DEMO_COOKIE);
  if (!c) return null;

  return {
    id: "1",
    name: "Hanaa",
    email: "hanaa@mail.com",
    avatar: "https://avatars.githubusercontent.com/u/40529421?v=4",
    username: "hanaa",
  };
}
