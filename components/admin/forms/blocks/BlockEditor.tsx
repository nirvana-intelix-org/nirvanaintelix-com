"use client";

import TextBlockEditor from "./TextBlockEditor";
import HeadingBlockEditor from "./HeadingBlockEditor";
import ImageBlockEditor from "./ImageBlockEditor";
import SliderBlockEditor from "./SliderBlockEditor";
import HtmlBlockEditor from "./HtmlBlockEditor";
import CtaBlockEditor from "./CtaBlockEditor";
import type { Block } from "@/lib/content/blocks";

export default function BlockEditor({
  block,
  onChange,
}: {
  block: Block;
  onChange: (b: Block) => void;
}) {
  switch (block.type) {
    case "text":
      return (
        <TextBlockEditor
          block={block}
          onChange={(b) => onChange(b)}
        />
      );
    case "heading":
      return (
        <HeadingBlockEditor
          block={block}
          onChange={(b) => onChange(b)}
        />
      );
    case "image":
      return (
        <ImageBlockEditor
          block={block}
          onChange={(b) => onChange(b)}
        />
      );
    case "slider":
      return (
        <SliderBlockEditor
          block={block}
          onChange={(b) => onChange(b)}
        />
      );
    case "html":
      return (
        <HtmlBlockEditor
          block={block}
          onChange={(b) => onChange(b)}
        />
      );
    case "cta":
      return (
        <CtaBlockEditor
          block={block}
          onChange={(b) => onChange(b)}
        />
      );
  }
}
