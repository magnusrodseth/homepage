import { notFound } from "next/navigation";
import { allPosts, allProjects } from "contentlayer/generated";

import { Mdx } from "@/components/mdx-components";

import "@/styles/mdx.css";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { absoluteUrl, cn, formatDate } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { env } from "@/env.mjs";

interface ProjectPageProps {
  params: {
    slug: string[];
  };
}

async function getProjectFromParams(params: ProjectPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const project = allProjects.find((project) => project.slugAsParams === slug);

  if (!project) {
    null;
  }

  return project;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectFromParams(params);

  if (!project) {
    return {};
  }

  const url = env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", project.title);
  ogUrl.searchParams.set("type", "Blog Post");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: absoluteUrl(project.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams(): Promise<
  ProjectPageProps["params"][]
> {
  return allProjects.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectFromParams(params);

  if (!project) {
    notFound();
  }

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/projects"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div>
        {project.date && (
          <time
            dateTime={project.date}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDate(project.date)}
          </time>
        )}
        <h1 className="mt-2 inline-block text-4xl leading-tight lg:text-5xl">
          {project.title}
        </h1>
      </div>
      {project.image && (
        <Image
          src={project.image}
          alt={project.title}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />
      )}
      <Mdx code={project.body.code} />
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
    </article>
  );
}
