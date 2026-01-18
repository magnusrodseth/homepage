import { H2, Muted, Small } from "@/components/ui/typography";
import BackLink from "@/components/back-link";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col gap-y-2 mb-32">
        <div className="w-full flex justify-between">
          <H2 className="animate-slide-enter">Blog</H2>
        </div>
        <Small className="animate-slide-enter">
          A collection of experiences, thoughts, and ideas throughout my career.
        </Small>
      </div>

      <div className="animate-slide-enter">
        <Muted className="text-center py-16">
          <span className="text-2xl block mb-2">Coming soon...</span>
          <span>Check back later for articles and insights.</span>
        </Muted>
      </div>

      <Separator className="my-8" />

      <BackLink />
    </div>
  );
}
