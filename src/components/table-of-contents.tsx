import { cn } from "@/lib/utils";
import { Heading } from "contentlayer.config";
import { ScrollArea } from "./ui/scroll-area";
import { Large } from "./ui/typography";
import { Separator } from "./ui/separator";
import Link from "next/link";
import BackToTop from "./back-to-top";

type TableOfContentsProps = {
  headings: Heading[];
};

const TableOfContents = ({ headings }: TableOfContentsProps) => {
  return (
    <aside
      className={cn(
        "order-first mx-8",
        "lg:order-last lg:sticky lg:top-[2rem] lg:h-[calc(100vh-2rem)]"
      )}
    >
      <ScrollArea className="h-64 lg:h-full">
        <div className="pr-4 lg:pr-0">
          <Large className="animate-slide-enter">On this page</Large>

          <Separator className="my-4 animate-slide-enter" />

          <div className="flex flex-col gap-y-2 text-muted-foreground text-sm">
            {headings.map((heading) => {
              return (
                <div
                  key={`#${heading.slug}`}
                  data-level={heading.level}
                  className={cn(
                    "animate-slide-enter",
                    "data-[level=three]:pl-2 data-[level=four]:pl-4 data-[level=five]:pl-6 data-[level=six]:pl-8 hover:text-foreground transition-all duration-300"
                  )}
                >
                  <Link href={`#${heading.slug}`}>{heading.text}</Link>
                </div>
              );
            })}
          </div>

          <Separator className="my-4 animate-slide-enter" />

          <BackToTop />
        </div>
      </ScrollArea>
    </aside>
  );
};

export default TableOfContents;
