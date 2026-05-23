import type { HeadingBlock as HeadingBlockType } from "@/lib/content/blocks";

const SIZE_BY_LEVEL: Record<1 | 2 | 3, string> = {
  1: "text-[clamp(2.6rem,7vw,5.4rem)]",
  2: "text-[clamp(2rem,5vw,3.8rem)]",
  3: "text-[clamp(1.6rem,3.5vw,2.6rem)]",
};

export default function HeadingBlock({ block }: { block: HeadingBlockType }) {
  const { text, level, em } = block.props;
  const cls = `font-serif font-normal leading-[0.95] tracking-tightest text-ink ${SIZE_BY_LEVEL[level]}`;
  const Tag = (`h${level}` as keyof React.JSX.IntrinsicElements);
  return (
    <div className="container-px py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <Tag className={cls}>
          {text}
          {em && (
            <>
              {" "}
              <span className="italic text-copper">{em}</span>
            </>
          )}
        </Tag>
      </div>
    </div>
  );
}
