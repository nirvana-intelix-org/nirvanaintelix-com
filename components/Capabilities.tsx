import Reveal from "./Reveal";

const groups = [
  {
    n: "A",
    title: "AI-Driven Commerce",
    items: [
      "AI shopping assistants",
      "OpenAI catalog content",
      "Behavioral recommendations",
      "Conversational support",
    ],
  },
  {
    n: "B",
    title: "Headless & Composable Commerce",
    items: [
      "BigCommerce builds",
      "Custom storefronts",
      "Checkout customization",
      "Payment integrations",
    ],
  },
  {
    n: "C",
    title: "Content & Education Platforms",
    items: [
      "AI-assisted publishing",
      "Reading & certification flows",
      "Children&apos;s story generation",
      "Bilingual content pipelines",
    ],
  },
  {
    n: "D",
    title: "Marketplaces & Classifieds",
    items: [
      "Vertical classifieds",
      "Listing distribution",
      "Multi-social syndication",
      "AI ad-copy generation",
    ],
  },
  {
    n: "E",
    title: "Community & Social Networks",
    items: [
      "Member profiles",
      "Groups, blogs, forums",
      "Job & event boards",
      "Activity feeds",
    ],
  },
  {
    n: "F",
    title: "Healthcare & Vertical SaaS",
    items: [
      "Practitioner directories",
      "Service advertising",
      "Audience targeting",
      "Compliance-aware content",
    ],
  },
  {
    n: "G",
    title: "Logistics & Operations",
    items: [
      "Pilgrim baggage delivery",
      "Carrier integrations",
      "Booking flows",
      "Co-working operations",
    ],
  },
  {
    n: "H",
    title: "Foundation",
    items: [
      "Next.js · TypeScript",
      "Node.js APIs · PostgreSQL",
      "BigCommerce · Stripe / Tap / Razorpay",
      "Google Cloud · Docker · CI/CD",
    ],
  },
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="section-pad relative border-t border-ink-line bg-paper-sunken/30"
    >
      <div className="container-px">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="section-number">02 / Capabilities</div>
            <h2 className="display-lg mt-4">
              What we <span className="italic text-copper">build</span>.
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-5">
            <p className="text-body">
              Eight kinds of products under one roof. Every category here
              is something we&apos;ve shipped to production and continue to
              operate in the MENA market.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid auto-rows-fr gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line md:grid-cols-4">
          {groups.map((g) => (
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
                    <span className="font-mono text-[10px] text-ink-dim">
                      ◦
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: i }} />
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
