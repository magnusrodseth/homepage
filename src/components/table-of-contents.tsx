"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { List } from "lucide-react";
import type { Heading } from "@/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type TableOfContentsProps = {
  headings: Heading[];
};

function TOCLinks({
  headings,
  activeId,
  onLinkClick,
}: {
  headings: Heading[];
  activeId: string;
  onLinkClick?: () => void;
}) {
  return (
    <ul className="space-y-2 text-sm">
      {headings.map(({ depth, text, slug }) => (
        <li key={slug}>
          <Link
            href={`#${slug}`}
            onClick={onLinkClick}
            className={cn(
              "block py-1 transition-colors hover:text-foreground",
              depth === 3 && "pl-4",
              activeId === slug
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            )}
          >
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ slug }) => {
      const element = document.getElementById(slug);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
<div className="xl:hidden fixed bottom-6 right-6 z-40">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="rounded-full shadow-lg">
              <List className="h-5 w-5" />
              <span className="sr-only">Table of contents</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle>On this page</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate to sections in this article
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
              <TOCLinks
                headings={headings}
                activeId={activeId}
                onLinkClick={() => setIsOpen(false)}
              />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

<nav className="hidden xl:block">
        <div className="sticky top-24">
          <p className="text-sm font-medium text-muted-foreground mb-4">
            On this page
          </p>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <TOCLinks headings={headings} activeId={activeId} />
          </ScrollArea>
        </div>
      </nav>
    </>
  );
}
