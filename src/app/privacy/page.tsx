import { Metadata } from "next";
import { H1, Small } from "@/components/ui/typography";
import BackLink from "@/components/back-link";
import { Separator } from "@/components/ui/separator";
import { PRIVACY_PAGE } from "@/config/pages";
import PrivacyContent from "@/content/pages/privacy.mdx";

export const metadata: Metadata = {
  title: PRIVACY_PAGE.title,
  description: PRIVACY_PAGE.tagline,
  alternates: {
    canonical: PRIVACY_PAGE.path,
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col gap-y-2 mb-10">
        <H1 className="animate-slide-enter text-3xl font-semibold">
          {PRIVACY_PAGE.title}
        </H1>
        <Small className="animate-slide-enter text-muted-foreground">
          {PRIVACY_PAGE.tagline}
        </Small>
      </div>

      <div className="mdx">
        <PrivacyContent />
      </div>

      <Separator className="my-8" />

      <BackLink />
    </div>
  );
}
