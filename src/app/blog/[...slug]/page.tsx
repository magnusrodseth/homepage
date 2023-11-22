import { notFound } from "next/navigation";
import { allPosts, allProjects } from "contentlayer/generated";

import { Mdx } from "@/components/mdx-components";

import "@/styles/globals.css";
import "@/styles/mdx.css";
import { Metadata } from "next";
import Image from "next/image";

import { formatDate, getUrl } from "@/lib/utils";
import { env } from "@/env.mjs";
import BackLink from "@/components/back-link";
import { H1, H2, H3 } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Callout } from "@/components/callout";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const url = getUrl();

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", post.title);
  ogUrl.searchParams.set("type", "Blog Post");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${url}/blog/${post.slugAsParams}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="container relative max-w-5xl py-6 lg:py-10">
      <BackLink />
      <div className="flex flex-col md:flex-row gap-y-2 justify-start items-center my-4 gap-x-2 text-muted-foreground text-sm animate-slide-enter">
        {post.date && (
          <time dateTime={post.date}>Published on {formatDate(post.date)}</time>
        )}
      </div>
      <H1 className="animate-slide-enter">{post.title}</H1>

      <Callout className="animate-slide-enter" icon={<Icons.lightbulb />}>
        {post.description}
      </Callout>

      {post.image && (
        <div className="w-full relative animate-slide-enter delay-200">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="my-8 rounded-md border bg-muted transition-colors object-cover"
            priority
          />
        </div>
      )}

      <div className="my-8">
        <Mdx code={post.body.code} />
      </div>

      <Separator className="my-4" />

      <div className="flex justify-center">
        <BackLink />
      </div>
    </article>
  );
}
