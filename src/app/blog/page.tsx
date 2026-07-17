import Link from "next/link";
import { Metadata } from "next";
import { cn, formatDate } from "@/lib/utils";
import { H1, H3, Muted, Small } from "@/components/ui/typography";
import BackLink from "@/components/back-link";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { getBlogPosts, BlogPostMeta } from "@/lib/blog";
import { BLOG_PAGE } from "@/config/pages";

export const metadata: Metadata = {
  title: BLOG_PAGE.title,
  description: BLOG_PAGE.tagline,
  alternates: {
    canonical: BLOG_PAGE.path,
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();

  const postsByYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<string, BlogPostMeta[]>
  );

  const sortedYears = Object.keys(postsByYear).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col gap-y-2 mb-16">
        <H1 className="animate-slide-enter text-3xl font-semibold">
          {BLOG_PAGE.title}
        </H1>
        <Small className="animate-slide-enter text-muted-foreground">
          {BLOG_PAGE.tagline}
        </Small>
      </div>

      {posts.length === 0 && (
        <div className="animate-slide-enter">
          <Muted className="text-center py-16">
            <span className="text-2xl block mb-2">Nothing here yet</span>
            <span>Check back later for articles and insights.</span>
          </Muted>
        </div>
      )}

      {posts.length > 0 && (
        <div className="flex flex-col gap-y-16 mt-12">
          {sortedYears.map((year, index) => {
            const delay = `${index * 0.15}s`;

            return (
              <div key={year} className="flex flex-col relative">
                <H3
                  aria-hidden="true"
                  className={cn(
                    "animate-slide-enter font-sans text-9xl",
                    "text-transparent pointer-events-none select-none",
                    "absolute -top-14 -left-6 md:-left-12"
                  )}
                  style={{
                    animationDelay: delay,
                    WebkitTextStroke: "1px var(--color-slate-600)",
                  }}
                >
                  {year}
                </H3>

                <div className="flex flex-col gap-y-4">
                  {postsByYear[year].map((post, cardIndex) => (
                    <PostCard
                      key={post.slug}
                      post={post}
                      yearDelay={index * 0.15}
                      cardIndex={cardIndex}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Separator className="my-8" />

      <BackLink />
    </div>
  );
}

function PostCard({
  post,
  yearDelay,
  cardIndex,
}: {
  post: BlogPostMeta;
  yearDelay: number;
  cardIndex: number;
}) {
  const delay = `${yearDelay + cardIndex * 0.06}s`;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "block rounded-lg px-4 py-3",
        "border border-border/50",
        "bg-background/50 backdrop-blur-sm",
        "animate-slide-enter transition-all duration-300",
        "hover:border-primary/40 hover:shadow-[0_0_15px_hsl(var(--primary)/0.08)]"
      )}
      style={{ animationDelay: delay }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <span className="text-lg font-semibold text-foreground min-w-0">
            {post.title}
          </span>
          <Icons.arrowUpRight className="h-4 w-4 opacity-30 shrink-0 mt-1" />
        </div>

        {post.description && (
          <Small className="text-muted-foreground line-clamp-2 leading-normal font-normal">
            {post.description}
          </Small>
        )}

        <Muted className="font-mono text-xs flex items-center gap-2">
          {formatDate(post.date)}
          <Icons.dot className="inline h-3 w-3" />
          {post.readingTimeMinutes} min read
          {post.lang === "no" && (
            <>
              <Icons.dot className="inline h-3 w-3" />
              norsk
            </>
          )}
        </Muted>
      </div>
    </Link>
  );
}
