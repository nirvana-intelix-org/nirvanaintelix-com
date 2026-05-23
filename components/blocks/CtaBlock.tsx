import type { CtaBlock as CtaBlockType } from "@/lib/content/blocks";

export default function CtaBlock({ block }: { block: CtaBlockType }) {
  const { heading, body, buttonLabel, buttonHref } = block.props;
  return (
    <div className="container-px py-12">
      <div className="mx-auto max-w-3xl rounded-2xl border border-ink-line bg-paper-raised p-8 text-center md:p-12">
        {heading && (
          <h3 className="font-serif text-3xl text-ink md:text-4xl">{heading}</h3>
        )}
        {body && <p className="text-body mt-3">{body}</p>}
        {buttonLabel && buttonHref && (
          <a href={buttonHref} className="btn-primary mt-6">
            {buttonLabel}
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
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
