import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-pad relative overflow-hidden border-t border-ink-line"
    >
      <div className="copper-glow -bottom-60 left-1/2 -translate-x-1/2" />

      <div className="container-px relative">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="section-number">04 / Contact</div>
            <h2 className="display-xl mt-4">
              Have an idea for
              <br />
              the <span className="italic text-copper">region</span>?
            </h2>
            <p className="text-body mt-8 max-w-xl">
              We work with founders, brands and operators across the MENA
              market — from AI-powered commerce builds to Arabic-first
              content platforms, marketplaces and community products.
              We&apos;d love to hear what you&apos;re building.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="mailto:hello@nirvanaintelix.com" className="btn-primary">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                hello@nirvanaintelix.com
              </a>
              <a
                href="https://nirvanaintelix.com"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                nirvanaintelix.com
              </a>
            </div>
          </Reveal>

          <Reveal delay={150} className="md:col-span-5">
            <div className="bento p-8">
              <div className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
                / studio
              </div>
              <dl className="mt-6 divide-y divide-ink-line">
                {[
                  { k: "What we do", v: "Build and operate digital products for the MENA market" },
                  { k: "Where we are", v: "Riyadh, KSA · New Delhi, IN" },
                  { k: "How we work", v: "End-to-end ownership — design, build, deploy, run" },
                  { k: "Engagement", v: "Product partnerships, equity builds, contract delivery" },
                  { k: "Languages", v: "Arabic + English, RTL by default" },
                  { k: "Platform", v: "Built on our Webziq multi-tenant platform" },
                ].map((b) => (
                  <div
                    key={b.k}
                    className="grid grid-cols-3 gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
                      {b.k}
                    </dt>
                    <dd className="col-span-2 text-sm text-ink">{b.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
