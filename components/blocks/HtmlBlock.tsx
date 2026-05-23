import type { HtmlBlock as HtmlBlockType } from "@/lib/content/blocks";

// Minimal allow-list sanitization. Removes <script>, <iframe>, on*=
// handlers and javascript: URLs. Not bulletproof — admin authors are
// trusted, but we strip the obvious injection vectors as a safety net.
function sanitize(input: string): string {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

export default function HtmlBlock({ block }: { block: HtmlBlockType }) {
  const html = sanitize(block.props.html);
  return (
    <div className="container-px py-6">
      <div
        className="mx-auto max-w-3xl"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
