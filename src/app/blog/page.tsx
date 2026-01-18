import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { H2, H3, Large, Muted, Small } from "@/components/ui/typography";
import BackLink from "@/components/back-link";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { getBlogPosts, BlogPost } from "@/lib/blog";

export const metadata = {
  title: "Blog",
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
    {} as Record<string, BlogPost[]>
  );

  const sortedYears = Object.keys(postsByYear).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col gap-y-2 mb-32">
        <H2 className="animate-slide-enter">Blog</H2>
        <Small className="animate-slide-enter">
          Thoughts on software, AI, and building things.
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
        <div className="flex flex-col gap-y-32 mt-16">
          {sortedYears.map((year, index) => {
            const delay = `${index * 0.2}s`;

            return (
              <div key={year} className="flex flex-col relative">
                <H3
                  className={cn(
                    "animate-slide-enter font-inter text-9xl",
                    "text-transparent",
                    "absolute -top-20 -left-6 md:-left-12"
                  )}
                  style={{
                    animationDelay: delay,
                    WebkitTextStroke: "1px var(--color-slate-800)",
                  }}
                >
                  {year}
                </H3>

                <div className="flex flex-col gap-y-4">
                  {postsByYear[year].map((post, cardIndex) => (
                    <PostCard
                      key={post.slug}
                      post={post}
                      yearDelay={index * 0.2}
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
  post: BlogPost;
  yearDelay: number;
  cardIndex: number;
}) {
  const delay = `${yearDelay + cardIndex * 0.08}s`;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "block rounded-lg px-4 py-3",
        "border border-border/50",
        "bg-background/50 backdrop-blur-sm",
        "animate-slide-enter transition-all duration-300",
        "text-muted-foreground hover:text-foreground",
        "hover:border-border hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
      )}
      style={{ animationDelay: delay }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <Large className="truncate min-w-0">{post.title}</Large>
          <Icons.arrowUpRight className="h-4 w-4 opacity-30 shrink-0 mt-1" />
        </div>

        {post.description && (
          <Small className="text-muted-foreground/70 line-clamp-2">
            {post.description}
          </Small>
        )}

        <Muted>{formatDate(post.date)}</Muted>
      </div>
    </Link>
  );
}
