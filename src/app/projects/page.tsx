import { Metadata } from "next";
import { H1, Small } from "@/components/ui/typography";
import BackLink from "@/components/back-link";
import { Separator } from "@/components/ui/separator";
import { getAllExperiences, Experience } from "@/lib/data/experience";
import { getReposWithPinned } from "@/lib/github";
import { GitHubRepo } from "@/lib/data/types";
import { env } from "@/env.mjs";
import { PROJECTS_PAGE } from "@/config/pages";
import {
  ProjectsExplorer,
  type ProjectItem,
} from "@/components/projects-explorer";

// Refresh the GitHub repo list hourly instead of freezing it at build time.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: PROJECTS_PAGE.title,
  description: PROJECTS_PAGE.tagline,
  alternates: {
    canonical: PROJECTS_PAGE.path,
  },
};

function experienceToProject(exp: Experience): ProjectItem {
  const hasSpecificProject = exp.links && exp.links.length > 0;
  const title = hasSpecificProject
    ? `${exp.role}: ${exp.links![0].title}`
    : `${exp.role} at ${exp.company}`;

  return {
    id: exp.id,
    title,
    description: exp.description,
    date: exp.startDate,
    url: exp.companyUrl,
    technologies: exp.technologies,
    isGitHub: false,
    category: exp.type,
    featured: exp.type === "professional",
  };
}

function repoToProject(repo: GitHubRepo, featured = false): ProjectItem {
  return {
    id: `gh-${repo.id}`,
    title: repo.name,
    description: repo.description || "No description",
    date: repo.createdAt,
    url: repo.htmlUrl,
    technologies: repo.topics,
    stars: repo.stargazersCount,
    language: repo.language || undefined,
    isGitHub: true,
    category: "open-source",
    featured,
  };
}

export default async function ProjectsPage() {
  const experiences = getAllExperiences();
  const username = env.GITHUB_USERNAME;

  let githubProjects: ProjectItem[] = [];

  try {
    const { pinned, recent } = await getReposWithPinned(username);
    githubProjects = [
      ...pinned.map((repo) => repoToProject(repo, true)),
      ...recent.map((repo) => repoToProject(repo)),
    ];
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
  }

  const experienceProjects = experiences.map(experienceToProject);

  const allProjects = [...experienceProjects, ...githubProjects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col gap-y-2 mb-16">
        <H1 className="animate-slide-enter text-3xl font-semibold">
          {PROJECTS_PAGE.title}
        </H1>
        <Small className="animate-slide-enter text-muted-foreground">
          {PROJECTS_PAGE.tagline}
        </Small>
      </div>

      <ProjectsExplorer projects={allProjects} />

      <Separator className="my-8" />

      <BackLink />
    </div>
  );
}
