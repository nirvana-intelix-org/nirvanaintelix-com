import Reveal from "./Reveal";
import { getContact } from "@/lib/content/reader";

export default async function Contact() {
  const data = await getContact();
  return (
    <section
      id="contact"
      className="section-pad relative overflow-hidden border-t border-ink-line"
    >
      <div className="copper-glow -bottom-60 left-1/2 -translate-x-1/2" />

      <div className="container-px relative">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="section-number">{data.sectionLabel}</div>
            <h2 className="display-xl mt-4">
              {data.heading}
              <br />
              the <span className="italic text-copper">{data.headingEm}</span>?
            </h2>
            <p className="text-body mt-8 max-w-xl">{data.body}</p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href={`mailto:${data.email}`} className="btn-primary">
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
                {data.email}
              </a>
              <a
                href={data.websiteHref}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                {data.websiteLabel}
              </a>
            </div>
          </Reveal>

          <Reveal delay={150} className="md:col-span-5">
            <div className="bento p-8">
              <div className="font-mono text-[11px] uppercase tracking-wider text-ink-dim">
                / studio
              </div>
              <dl className="mt-6 divide-y divide-ink-line">
                {data.vitals.map((b) => (
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
