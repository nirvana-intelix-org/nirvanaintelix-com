import { getFooter } from "@/lib/content/reader";

export default async function Footer() {
  const footer = await getFooter();
  const copy = footer.copyrightTemplate.replace(
    "{year}",
    String(new Date().getFullYear())
  );
  return (
    <footer className="border-t border-ink-line py-10">
      <div className="container-px flex items-center justify-center text-xs">
        <div className="flex items-center gap-3 font-mono uppercase tracking-wider text-ink-dim">
          {footer.showDot && (
            <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          )}
          {copy}
        </div>
      </div>
    </footer>
  );
}
