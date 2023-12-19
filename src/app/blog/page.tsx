import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { formatDate } from "@/lib/utils";
import { H2, Large, Muted, Small } from "@/components/ui/typography";
import BackLink from "@/components/back-link";
import { Icons } from "@/components/icons";
import { formatReadingTime } from "@/lib/readingTime";
import { Separator } from "@/components/ui/separator";
import { RouteProps } from "@/types";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage({ searchParams }: RouteProps) {
  const posts = allPosts
    .filter((post) =>
      process.env.NODE_ENV === "production" ? post.published : true
    )
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

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

      {posts.length === 0 && (
        <Muted className="animate-slide-enter">
          <span className="font-bold">Oops!</span> Nothing to see here yet.
          Please come back later.
        </Muted>
      )}

      {posts.length > 0 && (
        <div className="flex flex-col gap-y-2 mt-16">
          {posts.map((post, index) => {
            const delay = `${index * 0.2}s`;

            return (
              <Link
                key={post._id}
                className="flex flex-col md:flex-row justify-start items-start md:items-center gap-x-2 text-muted-foreground hover:text-foreground animate-slide-enter transition-all"
                href={`/blog/${post.slugAsParams}`}
                style={{ animationDelay: delay }}
              >
                <Large>{post.title}</Large>

                <Muted className="flex justify-center items-center">
                  {formatDate(post.date)} <Icons.dot className="inline" />{" "}
                  {formatReadingTime(post.readingTimeInMinutes)}
                </Muted>
              </Link>
            );
          })}
        </div>
      )}

      <Separator className="my-8" />

      <BackLink />
    </div>
  );
}
