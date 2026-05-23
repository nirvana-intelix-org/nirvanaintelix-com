import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { getProjects } from "@/lib/content/reader";

export default async function Projects() {
  const data = await getProjects();

  return (
    <section
      id="products"
      className="section-pad relative border-t border-ink-line"
    >
      <div className="container-px">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="section-number">{data.sectionLabel}</div>
            <h2 className="display-lg mt-4">
              {data.heading}{" "}
              <span className="italic text-copper">{data.headingEm}</span>.
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-5 md:justify-self-end">
            <p className="text-body">{data.intro}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-12">
          {data.items.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 100} className={p.span}>
              <TiltCard className="h-full rounded-2xl" intensity={p.flagship ? 3 : 5}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`bento bento-hover group relative flex h-full flex-col overflow-hidden ${
                    p.flagship ? "border-copper/30 bg-paper-raised" : ""
                  }`}
                >
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
                    >
                      {p.summary}
                    </p>

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
            {data.closingNote}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
