import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

type Project = {
  n: string;
  title: string;
  arabic?: string;
  tag: string;
  url: string;
  category: string;
  summary: string;
  stack: string[];
  span: string;
  swatch: string;
  screenshot: string;
  flagship?: boolean;
};

const projects: Project[] = [
  {
    n: "00",
    title: "Webziq",
    tag: "Our platform",
    category: "Multi-tenant website platform",
    url: "https://webziq.com",
    summary:
      "Our own multi-tenant SaaS platform — one Linear-style admin dashboard, many Webflow-style tenant sites. Operators run brands, content, billing and deploys from one place; tenants get a clean, modern starter template they can ship from on day one. The substrate the rest of our products are built and operated on.",
    stack: [
      "TypeScript",
      "Express",
      "Drizzle ORM",
      "Radix UI",
      "Plus Jakarta Sans",
      "Multi-tenant infra",
    ],
    span: "md:col-span-12",
    swatch: "from-[#15161a] to-[#2a2c33]",
    screenshot: "/screenshots/webziq.png",
    flagship: true,
  },
  {
    n: "01",
    title: "Khatrak",
    arabic: "دفاتر العبادة",
    tag: "Content + Education + AI",
    category: "Dafater Al-Ibadah",
    url: "https://khatrak.com",
    summary:
      "Integrated Islamic knowledge platform — reading, reflection and certification in one place. 200+ reflective books, 50+ reading plans, AI-assisted publishing for authors, verified certificates for institutions. Freemium with paid tiers from 29 SAR/month.",
    stack: ["Next.js", "Node.js", "OpenAI", "PostgreSQL", "Stripe / local pay"],
    span: "md:col-span-7",
    swatch: "from-[#1b6359] to-[#0f3d36]",
    screenshot: "/screenshots/khatrak.png",
  },
  {
    n: "02",
    title: "Posteds.net",
    tag: "Marketplace + AI",
    category: "Classifieds & ad distribution",
    url: "https://posteds.net",
    summary:
      "Classified ads platform for the Saudi market. AI generates the ad copy; the platform distributes across Facebook, Instagram, Snapchat and TikTok. 30 SAR per ad, featured placement, 24/7 promotion.",
    stack: ["Node.js", "OpenAI", "Social APIs", "WhatsApp"],
    span: "md:col-span-5",
    swatch: "from-[#bd5a1a] to-[#7e3a0e]",
    screenshot: "/screenshots/posteds.png",
  },
  {
    n: "03",
    title: "Menue.biz",
    tag: "AI Commerce · BigCommerce",
    category: "Wellness e-commerce",
    url: "https://menue.biz",
    summary:
      "Wellness e-commerce platform with an AI shopping assistant on BigCommerce. Curated product selection, encrypted payments, same-day delivery, real-time order monitoring. 1,000+ products, 50,000+ customers.",
    stack: ["BigCommerce", "Next.js", "OpenAI", "Stripe"],
    span: "md:col-span-5",
    swatch: "from-[#2d5e84] to-[#1a3b56]",
    screenshot: "/screenshots/menue.png",
  },
  {
    n: "04",
    title: "Sedanah",
    arabic: "سدانة",
    tag: "Logistics + E-commerce",
    category: "Pilgrim baggage + lifestyle",
    url: "https://sedanah.online",
    summary:
      "Baggage delivery service for pilgrims to Makkah and the holy sites, partnered with SMSA Express. Plus an Islamic lifestyle store — prayer items, modest fashion, fragrances, literature. Booking flow + commerce in one product.",
    stack: ["Next.js", "Node.js", "SMSA API", "PostgreSQL"],
    span: "md:col-span-7",
    swatch: "from-[#2a4d3a] to-[#162b21]",
    screenshot: "/screenshots/sedanah.png",
  },
  {
    n: "05",
    title: "Qasati",
    arabic: "قصتي",
    tag: "GenAI · Children",
    category: "rhlaa.com · rhlaa.xyz",
    url: "https://rhlaa.com",
    summary:
      "AI-powered Arabic children&apos;s story generator. Parents and educators describe a scene; the model returns an original, age-appropriate Arabic story. Story customization, child-safe output, bilingual surface.",
    stack: ["Next.js", "OpenAI", "Arabic NLP"],
    span: "md:col-span-6",
    swatch: "from-[#6a3486] to-[#3d1d53]",
    screenshot: "/screenshots/qasati.png",
  },
  {
    n: "06",
    title: "SehaCall",
    arabic: "صحة كول",
    tag: "Healthcare SaaS",
    category: "Medical service advertising",
    url: "https://sehacall.com",
    summary:
      "Healthcare advertising platform for medical professionals and providers in KSA — hospitals, clinics, specialists, mental health. Audience targeting + rapid deployment + multi-platform distribution from 30 SAR per ad.",
    stack: ["Node.js", "Next.js", "Social APIs"],
    span: "md:col-span-6",
    swatch: "from-[#7a1f3b] to-[#4a1024]",
    screenshot: "/screenshots/sehacall.png",
  },
  {
    n: "07",
    title: "Mubdun",
    arabic: "مبدئون",
    tag: "Co-working + Incubator",
    category: "Saudi Vision 2030 aligned",
    url: "https://mubdun.info",
    summary:
      "Co-working spaces, shared offices and business incubation for entrepreneurs and SMEs in Saudi Arabia. Quarterly / semi-annual / annual packages, meeting rooms, 24/7 access, free consulting, networking.",
    stack: ["Next.js", "Node.js", "Booking flows", "PostgreSQL"],
    span: "md:col-span-5",
    swatch: "from-[#bd5a1a] to-[#7e3a0e]",
    screenshot: "/screenshots/mubdun.png",
  },
  {
    n: "08",
    title: "Organesh",
    tag: "Community + Social",
    category: "Business + social networking",
    url: "https://organesh.com",
    summary:
      "Free business and social networking platform — posts, photos, videos, groups, blogs, classifieds, jobs, forums, events, video. A full community surface, not a single feature.",
    stack: ["Node.js", "Next.js", "PostgreSQL", "Realtime"],
    span: "md:col-span-7",
    swatch: "from-[#1f4f7a] to-[#102c45]",
    screenshot: "/screenshots/organesh.png",
  },
];

export default function Projects() {
  return (
    <section
      id="products"
      className="section-pad relative border-t border-ink-line"
    >
      <div className="container-px">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="section-number">03 / Products</div>
            <h2 className="display-lg mt-4">
              Live in <span className="italic text-copper">production</span>.
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-5 md:justify-self-end">
            <p className="text-body">
              Our platform and the products built on top of it. Click any of
              them to see the live site.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-12">
          {projects.map((p, i) => (
            <Reveal
              key={p.title}
              delay={(i % 2) * 100}
              className={p.span}
            >
              <TiltCard className="h-full rounded-2xl" intensity={p.flagship ? 3 : 5}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`bento bento-hover group relative flex h-full flex-col overflow-hidden ${
                    p.flagship ? "border-copper/30 bg-paper-raised" : ""
                  }`}
                >
                  {/* Screenshot banner */}
                  <div
                    className={`relative overflow-hidden border-b border-ink-line bg-gradient-to-br ${p.swatch} ${
                      p.flagship ? "aspect-[21/9]" : "aspect-[16/10]"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.screenshot}
                      alt={`${p.title} live site`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
                    <span
                      className={`absolute top-3 right-3 pill whitespace-nowrap backdrop-blur-md ${
                        p.flagship ? "pill-teal" : "pill-copper"
                      }`}
                    >
                      {p.flagship && (
                        <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                      )}
                      {p.tag}
                    </span>
                  </div>

                  <div className={`flex flex-1 flex-col p-6 md:p-7 ${p.flagship ? "md:p-9" : ""}`}>
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid place-items-center rounded-xl bg-gradient-to-br ${p.swatch} font-serif text-white shadow-sm ${
                          p.flagship ? "h-12 w-12 text-base" : "h-10 w-10 text-sm"
                        }`}
                      >
                        {p.title.slice(0, 1)}
                      </span>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-wider text-ink-dim">
                          {p.n} · {p.category}
                        </div>
                      </div>
                    </div>

                  <h3
                    className={`mt-5 flex items-baseline gap-3 font-serif text-ink transition group-hover:text-copper ${
                      p.flagship ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"
                    }`}
                  >
                    {p.title}
                    {p.arabic && (
                      <span className="text-2xl text-ink-muted md:text-3xl">
                        {p.arabic}
                      </span>
                    )}
                  </h3>

                  <p
                    className={`mt-4 leading-relaxed text-ink-muted ${
                      p.flagship ? "max-w-3xl text-base md:text-lg" : "text-sm"
                    }`}
                    dangerouslySetInnerHTML={{ __html: p.summary }}
                  />

                  <div className="mt-auto pt-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-line pt-5">
                      <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="font-mono text-[11px] uppercase tracking-wider text-ink-dim"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-copper transition group-hover:gap-2">
                        Visit
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17L17 7M9 7h8v8" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  </div>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 rounded-2xl border border-dashed border-ink-line bg-paper-raised/50 p-6 text-center text-sm text-ink-muted">
            More products live on our deploy infrastructure — we&apos;ll add
            them here as we ship.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
