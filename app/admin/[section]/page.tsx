import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import HeaderForm from "@/components/admin/forms/HeaderForm";
import HeroForm from "@/components/admin/forms/HeroForm";
import AboutForm from "@/components/admin/forms/AboutForm";
import CapabilitiesForm from "@/components/admin/forms/CapabilitiesForm";
import ProjectsForm from "@/components/admin/forms/ProjectsForm";
import ContactForm from "@/components/admin/forms/ContactForm";
import FooterForm from "@/components/admin/forms/FooterForm";
import { getSession } from "@/lib/auth/session";
import {
  getHeader,
  getHero,
  getAbout,
  getCapabilities,
  getProjects,
  getContact,
  getFooter,
} from "@/lib/content/reader";
import {
  SECTIONS,
  SECTION_LABELS,
  type SectionName,
} from "@/lib/content/schema";

export const dynamic = "force-dynamic";

const SECTION_HINTS: Record<SectionName, string> = {
  header: "Brand mark, nav links and the top-right CTA.",
  hero: "Headline, pills, body copy, CTAs, stats and marquee items.",
  about: "Pull quote, paragraphs and the four principles bento.",
  capabilities: "The 8-card grid of capability categories.",
  projects: "Live products — flagship + the rest, with screenshots and tags.",
  contact: "Headline, body, email and the vitals card.",
  footer: "Copyright line — use {year} for the current year.",
};

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const session = await getSession();
  if (!session.loggedIn) {
    redirect("/admin/login");
  }

  const { section } = await params;
  if (!(SECTIONS as readonly string[]).includes(section)) {
    notFound();
  }
  const name = section as SectionName;

  let form: React.ReactNode;
  switch (name) {
    case "header":
      form = <HeaderForm initial={await getHeader()} />;
      break;
    case "hero":
      form = <HeroForm initial={await getHero()} />;
      break;
    case "about":
      form = <AboutForm initial={await getAbout()} />;
      break;
    case "capabilities":
      form = <CapabilitiesForm initial={await getCapabilities()} />;
      break;
    case "projects":
      form = <ProjectsForm initial={await getProjects()} />;
      break;
    case "contact":
      form = <ContactForm initial={await getContact()} />;
      break;
    case "footer":
      form = <FooterForm initial={await getFooter()} />;
      break;
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-4xl text-ink">{SECTION_LABELS[name]}</h1>
          <p className="text-body mt-2 max-w-2xl text-sm">
            {SECTION_HINTS[name]}
          </p>
        </div>
        <Link
          href={`/admin/${name}/raw`}
          className="font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink"
        >
          Edit as JSON →
        </Link>
      </div>

      <div className="mt-6 pb-6">{form}</div>
    </div>
  );
}
