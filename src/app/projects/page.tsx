import { H2, Small } from "@/components/ui/typography";
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

export const metadata = {
  title: PROJECTS_PAGE.title,
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
  };
}

function repoToProject(repo: GitHubRepo): ProjectItem {
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
  };
}

export default async function ProjectsPage() {
  const experiences = getAllExperiences();
  const username = env.GITHUB_USERNAME;

  let githubProjects: ProjectItem[] = [];

  try {
    const { recent } = await getReposWithPinned(username);
    githubProjects = recent.map(repoToProject);
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
  }

  const experienceProjects = experiences.map(experienceToProject);

  const allProjects = [...experienceProjects, ...githubProjects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col gap-y-2 mb-32">
        <H2 className="animate-slide-enter">{PROJECTS_PAGE.title}</H2>
        <Small className="animate-slide-enter">{PROJECTS_PAGE.tagline}</Small>
      </div>

      <ProjectsExplorer projects={allProjects} />

      <Separator className="my-8" />

      <BackLink />
    </div>
  );
}
