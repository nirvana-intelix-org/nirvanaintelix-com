import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="container-px">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <Reveal>
                <div className="section-number">01 / Studio</div>
                <h2 className="display-lg mt-4">
                  We build products
                  <br />
                  that <span className="italic text-copper">ship</span>.
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="space-y-6">
              <p className="font-serif text-2xl leading-snug text-ink md:text-3xl">
                &ldquo;The MENA market doesn&apos;t need translated software.
                It needs products designed for it from day one.&rdquo;
              </p>
              <p className="text-body">
                Nirvana Intelix is a product studio. We design, build and
                operate digital products for the Middle East — Arabic-first
                UX, local payments, regional logistics, and the cultural and
                regulatory context that turns a generic SaaS into something
                people actually use.
              </p>
              <p className="text-body">
                We work across AI-driven commerce, content and education
                platforms, marketplaces, community networks, healthcare and
                Islamic technology. Each product on this page is one we&apos;ve
                shipped to production and continue to run.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2">
              {[
                {
                  k: "Build to ship",
                  v: "Concept → production, not endless prototypes. Every product on this page is live and operating.",
                },
                {
                  k: "Bilingual by default",
                  v: "Arabic and English UX, RTL-aware components, locale-aware SEO from the first commit.",
                },
                {
                  k: "AI where it earns it",
                  v: "LLMs in catalog content, support, classifieds copy and story generation — only where it changes the unit economics.",
                },
                {
                  k: "We run what we build",
                  v: "Production ownership across deploys, observability and incident response — not just delivery.",
                },
              ].map((b) => (
                <div
                  key={b.k}
                  className="bg-paper p-6 transition hover:bg-paper-raised"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-copper" />
                    <div>
                      <div className="text-sm font-medium text-ink">{b.k}</div>
                      <div className="mt-1.5 text-sm text-ink-muted">
                        {b.v}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
