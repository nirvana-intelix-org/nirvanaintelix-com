import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function AdminRoot() {
  const session = await getSession();
  if (!session.loggedIn) {
    redirect("/admin/login");
  }
  redirect("/admin/header");
}
