import { Metadata } from "next";
import { H1, Small } from "@/components/ui/typography";
import BackLink from "@/components/back-link";
import { Separator } from "@/components/ui/separator";
import { DOCS_PAGE } from "@/config/pages";
import DocsContent from "@/content/pages/docs.mdx";

export const metadata: Metadata = {
  title: DOCS_PAGE.title,
  description: DOCS_PAGE.tagline,
  alternates: {
    canonical: DOCS_PAGE.path,
  },
};

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col gap-y-2 mb-10">
        <H1 className="animate-slide-enter text-3xl font-semibold">
          {DOCS_PAGE.title}
        </H1>
        <Small className="animate-slide-enter text-muted-foreground">
          {DOCS_PAGE.tagline}
        </Small>
      </div>

      <div className="mdx">
        <DocsContent />
      </div>

      <Separator className="my-8" />

      <BackLink />
    </div>
  );
}
