import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";

import { Mdx } from "@/components/mdx-components";

import "@/styles/globals.css";
import "@/styles/mdx.css";
import { Metadata } from "next";
import Image from "next/image";

import { cn, formatDate, getUrl } from "@/lib/utils";
import { env } from "@/env.mjs";
import BackLink from "@/components/back-link";
import { H1, H2, H3, Large } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Callout } from "@/components/callout";
import { Heading } from "contentlayer.config";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const url = getUrl();

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", project.title);
  ogUrl.searchParams.set("type", "Project");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `${url}/projects/${project.slugAsParams}`,
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
  const headings = project?.headings as Heading[];

  if (!project) {
    notFound();
  }

  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row w-full justify-between",
        project.toc ? "lg:gap-x-4" : "lg:gap-x-0"
      )}
    >
      <article className="container relative max-w-5xl py-6 lg:py-10">
        <BackLink />
        <div className="flex flex-col md:flex-row gap-y-2 justify-start items-center my-4 gap-x-2 text-muted-foreground text-sm animate-slide-enter">
          {project.date && (
            <time dateTime={project.date}>
              Published {formatDate(project.date)}
            </time>
          )}
          {project.readingTimeInMinutes && (
            <>
              <Separator
                orientation="vertical"
                className="h-6 hidden md:flex"
              />
              <span>{project.readingTimeInMinutes} min read</span>
            </>
          )}

          {project.link && (
            <div className="flex justify-center items-center gap-x-2">
              <Separator
                orientation="vertical"
                className="h-6 hidden md:flex"
              />

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
              <Separator
                orientation="vertical"
                className="h-6 hidden md:flex"
              />

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

      {project.toc && (
        <aside
          className={cn(
            "order-first mx-8",
            "lg:order-last lg:sticky lg:top-[2rem] lg:h-[calc(100vh-2rem)]"
          )}
        >
          <ScrollArea className="h-64 lg:h-full">
            <div className="pr-4 lg:pr-0">
              <Large className="animate-slide-enter">On this page</Large>

              <Separator className="my-4 animate-slide-enter delay-200" />

              <div className="flex flex-col gap-y-2 text-muted-foreground text-sm">
                {headings.map((heading) => {
                  return (
                    <div
                      key={`#${heading.slug}`}
                      className="animate-slide-enter delay-300"
                    >
                      <Link
                        data-level={heading.level}
                        href={`#${heading.slug}`}
                        className={cn(
                          "data-[level=two] data-[level=three]:pl-2 data-[level=four]:pl-4 data-[level=five]:pl-6 data-[level=six]:pl-8 hover:text-foreground transition-all duration-300"
                        )}
                      >
                        {heading.text}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollArea>
        </aside>
      )}
    </div>
  );
}
