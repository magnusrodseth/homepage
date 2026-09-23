import Image from "next/image";
import Link from "next/link";
import { currentBook } from "@/lib/data/current-book";

export function CurrentlyReading() {
  if (!currentBook) return null;

  const { title, author, synopsis, coverId, url } = currentBook;

  return (
    <div>
      <h3 className="text-sm text-muted-foreground mb-3 font-mono font-normal">
        Currently reading
      </h3>
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-4 rounded-md p-2 -mx-2 transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        aria-label={`${title} by ${author} on Open Library`}
      >
        {coverId && (
          <Image
            src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`}
            alt={`Cover of ${title}`}
            width={72}
            height={108}
            sizes="72px"
            className="h-[108px] w-[72px] shrink-0 rounded-sm border border-border/50 object-cover"
          />
        )}
        <div className="min-w-0 pt-0.5">
          <p className="text-base font-medium text-foreground transition-colors group-hover:text-primary">
            {title}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">{author}</p>
          {synopsis && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {synopsis}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
