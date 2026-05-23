import Reveal from "./Reveal";
import { getAbout } from "@/lib/content/reader";

export default async function About() {
  const data = await getAbout();
  const [headingTrailBefore, headingTrailAfter] = data.headingTrail.split("{em}");

  return (
    <section id="about" className="section-pad relative">
      <div className="container-px">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <Reveal>
                <div className="section-number">{data.sectionLabel}</div>
                <h2 className="display-lg mt-4">
                  {data.heading}
                  <br />
                  {headingTrailBefore}
                  <span className="italic text-copper">{data.headingEm}</span>
                  {headingTrailAfter}
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="space-y-6">
              <p className="font-serif text-2xl leading-snug text-ink md:text-3xl">
                &ldquo;{data.quote}&rdquo;
              </p>
              {data.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="text-body">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2">
              {data.principles.map((b) => (
                <div
                  key={b.k}
                  className="bg-paper p-6 transition hover:bg-paper-raised"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-copper" />
                    <div>
                      <div className="text-sm font-medium text-ink">{b.k}</div>
                      <div className="mt-1.5 text-sm text-ink-muted">{b.v}</div>
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
