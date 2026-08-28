import { Metadata } from "next";
import { H1, Small } from "@/components/ui/typography";
import BackLink from "@/components/back-link";
import { Separator } from "@/components/ui/separator";
import { CONTACT_PAGE } from "@/config/pages";
import ContactContent from "@/content/pages/contact.mdx";

export const metadata: Metadata = {
  title: CONTACT_PAGE.title,
  description: CONTACT_PAGE.tagline,
  alternates: {
    canonical: CONTACT_PAGE.path,
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col gap-y-2 mb-10">
        <H1 className="animate-slide-enter text-3xl font-semibold">
          {CONTACT_PAGE.title}
        </H1>
        <Small className="animate-slide-enter text-muted-foreground">
          {CONTACT_PAGE.tagline}
        </Small>
      </div>

      <div className="mdx">
        <ContactContent />
      </div>

      <Separator className="my-8" />

      <BackLink />
    </div>
  );
}
