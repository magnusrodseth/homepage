import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";

import { Mdx } from "@/components/mdx-components";

import "@/styles/globals.css";
import "@/styles/mdx.css";
import { Metadata } from "next";
import Image from "next/image";

import { absoluteUrl, formatDate } from "@/lib/utils";
import { env } from "@/env.mjs";
import BackLink from "@/components/back-link";
import { H1, H2, H3 } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Callout } from "@/components/callout";

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
    <article className="container relative max-w-5xl py-6 lg:py-10">
      <BackLink />
      <div className="flex flex-col md:flex-row gap-y-2 justify-start items-center my-4 gap-x-2 text-muted-foreground text-sm animate-slide-enter">
        {project.date && (
          <time dateTime={project.date}>
            Published on {formatDate(project.date)}
          </time>
        )}

        {project.link && (
          <div className="flex justify-center items-center gap-x-2">
            <Separator orientation="vertical" className="h-6 hidden md:flex" />

            <Link
              href={project.link}
              target="_blank"
              className="flex justify-center items-center gap-x-1 group hover:text-foreground transition-all duration-300"
            >
              <Icons.link className="w-4 inline group-hover:rotate-180 duration-300" />
              Read more
            </Link>
          </div>
        )}

        {project.githubLink && (
          <div className="flex justify-center items-center gap-x-2">
            <Separator orientation="vertical" className="h-6 hidden md:flex" />

            <Link
              href={project.githubLink}
              target="_blank"
              className="flex justify-center items-center gap-x-1 hover:text-foreground transition-all duration-300"
            >
              <Icons.gitHub className="w-4 inline" />
              View on GitHub
            </Link>
          </div>
        )}
      </div>
      <H1 className="animate-slide-enter">{project.title}</H1>

      <Callout className="animate-slide-enter" icon={<Icons.lightbulb />}>
        {project.description}
      </Callout>

      {project.image && (
        <div className="w-full relative animate-slide-enter delay-200">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="my-8 rounded-md border bg-muted transition-colors object-cover"
            priority
          />
        </div>
      )}

      <div className="my-8">
        <Mdx code={project.body.code} />
      </div>

      <Separator className="my-4" />

      <div className="flex justify-center">
        <BackLink />
      </div>
    </article>
  );
}
