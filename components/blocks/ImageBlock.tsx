import type { ImageBlock as ImageBlockType } from "@/lib/content/blocks";

export default function ImageBlock({ block }: { block: ImageBlockType }) {
  const { src, alt, caption } = block.props;
  if (!src) return null;
  return (
    <figure className="container-px py-8">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-ink-line bg-paper-raised">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block h-auto w-full" />
      </div>
      {caption && (
        <figcaption className="mx-auto mt-3 max-w-4xl text-center font-mono text-[11px] uppercase tracking-wider text-ink-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
