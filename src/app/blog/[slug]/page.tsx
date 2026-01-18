import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

import { getBlogPostBySlug, getBlogSlugs } from "@/lib/blog";
import { extractHeadings } from "@/lib/mdx";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";
import { H1, Muted } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import BackLink from "@/components/back-link";
import { TableOfContents } from "@/components/table-of-contents";
import { useMDXComponents } from "../../../../mdx-components";

type Props = {
  params: Promise<{ slug: string }>;
};

const mdxOptions: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
        },
      ],
    ] as never,
  },
};

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);
  const components = useMDXComponents({});

  return (
    <div className="mx-auto max-w-6xl">
      <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-10">
        <div className="mx-auto max-w-2xl w-full">
          <article>
            <header className="mb-8">
              <H1 className="animate-slide-enter mb-2">{post.title}</H1>
              <Muted className="animate-slide-enter">
                {formatDate(post.date)}
              </Muted>
            </header>

            <div className="mdx animate-slide-enter delay-200">
              <MDXRemote
                source={post.content}
                components={components}
                options={mdxOptions}
              />
            </div>
          </article>

          <Separator className="my-8" />

          <BackLink />
        </div>

        <TableOfContents headings={headings} />
      </div>
    </div>
  );
}
