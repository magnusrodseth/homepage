import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";

import "@/styles/globals.css";
import "@/styles/mdx.css";
import { Metadata } from "next";

import { getUrl } from "@/lib/utils";
import { Heading } from "contentlayer.config";
import ArticleLayout from "@/components/article-layout";

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

  return <ArticleLayout item={project} headings={headings} />;
}
