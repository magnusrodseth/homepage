import { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import { H1, Muted } from "@/components/ui/typography";
import BackLink from "@/components/back-link";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { extractHeadings } from "@/lib/mdx";
import { TableOfContents } from "@/components/table-of-contents";

const post = {
  title: "Slik maksimerer du agentiske arbeidsflyter",
  description:
    "Hvordan systematisk optimalisere arbeidsflyten for å maksimere kvaliteten på AI-generert kode og minimere tiden du bruker på manuell tasting.",
  date: "2025-11-18",
};

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  openGraph: {
    title: post.title,
    description: post.description,
    type: "article",
    publishedTime: post.date,
    url: `${siteConfig.url}/blog/vibe-maxxing`,
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.description,
  },
};

async function getHeadings() {
  const filePath = path.join(
    process.cwd(),
    "src/app/blog/vibe-maxxing/page.mdx"
  );
  const content = await fs.readFile(filePath, "utf-8");
  return extractHeadings(content);
}

export default async function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headings = await getHeadings();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-10">
        <div className="mx-auto max-w-2xl w-full">
          <article>
            <header className="mb-8">
              <H1 className="animate-slide-enter mb-2">{post.title}</H1>
              <Muted className="animate-slide-enter">
                {formatDate(post.date)}
              </Muted>
            </header>

            <div className="mdx animate-slide-enter delay-200">{children}</div>
          </article>

          <Separator className="my-8" />

          <BackLink />
        </div>

        <TableOfContents headings={headings} />
      </div>
    </div>
  );
}
