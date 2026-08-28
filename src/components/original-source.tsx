import Link from "next/link";
import { cn } from "@/lib/utils";
import { POST_SOURCES, type PostSource } from "@/lib/blog";
import { Icons } from "@/components/icons";

type OriginalSourceProps = {
  source: PostSource;
  url: string;
  className?: string;
};

/**
 * Republication notice for posts that first ran elsewhere. Driven by the
 * `source` / `sourceUrl` frontmatter pair so every post states it the same
 * way, rather than each MDX file hand-writing the sentence.
 */
export function OriginalSource({ source, url, className }: OriginalSourceProps) {
  return (
    <aside
      className={cn(
        "flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3",
        className
      )}
    >
      <Icons.arrowUpRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-muted-foreground"
      />
      <p className="text-sm text-muted-foreground">
        Opprinnelig publisert på{" "}
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
        >
          {POST_SOURCES[source]}
        </Link>
      </p>
    </aside>
  );
}
