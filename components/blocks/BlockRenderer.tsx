import TextBlock from "./TextBlock";
import HeadingBlock from "./HeadingBlock";
import ImageBlock from "./ImageBlock";
import SliderBlock from "./SliderBlock";
import HtmlBlock from "./HtmlBlock";
import CtaBlock from "./CtaBlock";
import type { Block } from "@/lib/content/blocks";

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case "text":
            return <TextBlock key={block.id} block={block} />;
          case "heading":
            return <HeadingBlock key={block.id} block={block} />;
          case "image":
            return <ImageBlock key={block.id} block={block} />;
          case "slider":
            return <SliderBlock key={block.id} block={block} />;
          case "html":
            return <HtmlBlock key={block.id} block={block} />;
          case "cta":
            return <CtaBlock key={block.id} block={block} />;
        }
      })}
    </>
  );
}
