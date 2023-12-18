import { Mdx } from "@/components/mdx-components";
import Socials from "@/components/socials";
import { H2, Muted } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { allPages } from "contentlayer/generated";

export default function Home() {
  const indexPage = allPages.find((page) => page._id === "pages/index.mdx");

  return (
    <div className="mx-auto max-w-2xl">
      <H2
        className={cn(
          "animate-slide-enter uppercase text-4xl font-extrabold tracking-tight",
          "bg-gradient-to-r from-indigo-100 to-indigo-400 text-transparent bg-clip-text"
        )}
      >
        {siteConfig.name}
      </H2>

      {indexPage && (
        <div className="mt-4">
          <Mdx code={indexPage.body.code} />
        </div>
      )}

      <div className="flex justify-start items-center gap-x-4 py-8 animate-slide-enter delay-400">
        <Muted>
          <span className="font-semibold">Psst.</span> You can reach me on
        </Muted>
        <Socials />
      </div>
    </div>
  );
}
