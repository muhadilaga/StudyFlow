import { redirect } from "next/navigation";
import { getOptionalUser } from "@/lib/auth/get-user";

export async function requireUser() {
  const user = await getOptionalUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
