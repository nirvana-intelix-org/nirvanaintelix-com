import { redirect, notFound } from "next/navigation";
import PageEditor from "./PageEditor";
import { getSession } from "@/lib/auth/session";
import { getPageById } from "@/lib/content/pages";
import type { Block } from "@/lib/content/blocks";

export const dynamic = "force-dynamic";

export default async function PageEditorRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session.loggedIn) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const page = await getPageById(id);
  if (!page) notFound();

  return (
    <PageEditor
      id={page.id}
      initial={{
        slug: page.slug,
        title: page.title,
        description: page.description,
        blocks: page.blocks as Block[],
        published: page.published,
      }}
    />
  );
}
