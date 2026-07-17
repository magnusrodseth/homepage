import { Metadata } from "next";
import { H1, Small } from "@/components/ui/typography";
import BackLink from "@/components/back-link";
import { Separator } from "@/components/ui/separator";
import { DAILY_DRIVERS_PAGE } from "@/config/pages";
import DailyDriversContent from "@/content/pages/daily-drivers.mdx";

export const metadata: Metadata = {
  title: DAILY_DRIVERS_PAGE.title,
  description: DAILY_DRIVERS_PAGE.tagline,
  alternates: {
    canonical: DAILY_DRIVERS_PAGE.path,
  },
};

export default function DailyDriversPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col gap-y-2 mb-10">
        <H1 className="animate-slide-enter text-3xl font-semibold">
          {DAILY_DRIVERS_PAGE.title}
        </H1>
        <Small className="animate-slide-enter text-muted-foreground">
          {DAILY_DRIVERS_PAGE.tagline}
        </Small>
      </div>

      <div className="mdx">
        <DailyDriversContent />
      </div>

      <Separator className="my-8" />

      <BackLink />
    </div>
  );
}
