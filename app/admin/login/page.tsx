import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { getSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = await getSession();
  if (session.loggedIn) {
    redirect("/admin");
  }
  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-serif text-4xl text-ink">Admin sign-in</h1>
      <p className="text-body mt-3 text-sm">
        Enter the admin password to manage site content.
      </p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
}
