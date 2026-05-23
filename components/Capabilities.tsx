import Reveal from "./Reveal";
import { getCapabilities } from "@/lib/content/reader";

export default async function Capabilities() {
  const data = await getCapabilities();
  return (
    <section
      id="capabilities"
      className="section-pad relative border-t border-ink-line bg-paper-sunken/30"
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
          <Reveal delay={120} className="md:col-span-5">
            <p className="text-body">{data.intro}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid auto-rows-fr gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line md:grid-cols-4">
          {data.groups.map((g) => (
            <div
              key={g.title}
              className="group relative bg-paper p-6 transition hover:bg-paper-raised"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-dim">
                  {g.n}
                </span>
                <h3 className="text-sm font-medium text-ink">{g.title}</h3>
              </div>
              <ul className="mt-5 space-y-2.5">
                {g.items.map((i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-2.5 text-sm text-ink-muted"
                  >
                    <span className="font-mono text-[10px] text-ink-dim">◦</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
