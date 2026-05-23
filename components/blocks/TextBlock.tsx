import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import type { TextBlock as TextBlockType } from "@/lib/content/blocks";

export default function TextBlock({ block }: { block: TextBlockType }) {
  return (
    <div className="container-px py-6">
      <div className="prose prose-ink mx-auto max-w-3xl text-ink-soft prose-headings:font-serif prose-headings:text-ink prose-a:text-copper prose-strong:text-ink prose-li:my-1">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
          {block.props.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
