import { redirect } from "next/navigation";
import NewPageForm from "./NewPageForm";
import { getSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function NewPage() {
  const session = await getSession();
  if (!session.loggedIn) {
    redirect("/admin/login");
  }
  return (
    <div>
      <h1 className="font-serif text-4xl text-ink">New page</h1>
      <p className="text-body mt-2 max-w-2xl text-sm">
        Give the page a slug and title. You can add blocks after it&apos;s
        created.
      </p>
      <div className="mt-6 max-w-xl">
        <NewPageForm />
      </div>
    </div>
  );
}
