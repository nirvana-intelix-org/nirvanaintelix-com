import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { getPageBySlug } from "@/lib/content/pages";
import { isReservedSlug, type Block } from "@/lib/content/blocks";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (isReservedSlug(slug)) return {};
  const page = await getPageBySlug(slug).catch(() => null);
  if (!page || !page.published) return {};
  return {
    title: `${page.title} · Nirvana Intelix`,
    description: page.description || undefined,
    alternates: { canonical: `/${page.slug}` },
  };
}

export default async function CustomPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  if (isReservedSlug(slug)) notFound();

  const page = await getPageBySlug(slug);
  if (!page || !page.published) notFound();

  const blocks = page.blocks as Block[];

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main className="pt-24 md:pt-28">
        <div className="container-px pb-2">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-dim">
            / {page.slug}
          </div>
        </div>
        <BlockRenderer blocks={blocks} />
      </main>
      <Footer />
    </>
  );
}
