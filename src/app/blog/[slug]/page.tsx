import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";

import { getBlogPostBySlug, getBlogSlugs } from "@/lib/blog";
import { extractHeadings } from "@/lib/mdx";
import { mdxRemoteOptions } from "@/lib/mdx-plugins.mjs";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";
import { H1, Muted } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import BackLink from "@/components/back-link";
import { TableOfContents } from "@/components/table-of-contents";
import { Icons } from "@/components/icons";
import { useMDXComponents } from "../../../../mdx-components";

type Props = {
  params: Promise<{ slug: string }>;
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
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${slug}`,
      images: [
        {
          url: `/blog/${slug}/og.png`,
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
      images: [
        {
          url: `/blog/${slug}/og.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
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

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: post.lang,
    url: `${siteConfig.url}/blog/${slug}`,
    image: `${siteConfig.url}/blog/${slug}/og.png`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <div className="mx-auto max-w-6xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />

      <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-10">
        <div className="mx-auto max-w-2xl w-full">
          <article lang={post.lang}>
            <header className="mb-8">
              <H1 className="animate-slide-enter mb-2">{post.title}</H1>
              <Muted className="animate-slide-enter font-mono flex items-center gap-2">
                {formatDate(post.date)}
                <Icons.dot className="inline h-3 w-3" />
                {post.readingTimeMinutes} min read
              </Muted>
            </header>

            <div className="mdx animate-slide-enter stagger-200">
              <MDXRemote
                source={post.content}
                components={components}
                options={mdxRemoteOptions as MDXRemoteProps["options"]}
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
