import { Metadata } from "next";
import { H1, Small } from "@/components/ui/typography";
import BackLink from "@/components/back-link";
import { Separator } from "@/components/ui/separator";
import { ABOUT_PAGE } from "@/config/pages";
import AboutContent from "@/content/pages/about.mdx";

export const metadata: Metadata = {
  title: ABOUT_PAGE.title,
  description: ABOUT_PAGE.tagline,
  alternates: {
    canonical: ABOUT_PAGE.path,
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col gap-y-2 mb-10">
        <H1 className="animate-slide-enter text-3xl font-semibold">
          {ABOUT_PAGE.title}
        </H1>
        <Small className="animate-slide-enter text-muted-foreground">
          {ABOUT_PAGE.tagline}
        </Small>
      </div>

      <div className="mdx">
        <AboutContent />
      </div>

      <Separator className="my-8" />

      <BackLink />
    </div>
  );
}
