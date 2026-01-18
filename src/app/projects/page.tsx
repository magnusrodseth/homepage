import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { H2, H3, Large, Muted, Small } from "@/components/ui/typography";
import BackLink from "@/components/back-link";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { getAllExperiences, Experience } from "@/lib/data/experience";
import { getReposWithPinned } from "@/lib/github";
import { GitHubRepo } from "@/lib/data/types";
import { env } from "@/env.mjs";
import { ExpandableText } from "@/components/expandable-text";

export const metadata = {
  title: "Projects",
};

type ProjectItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  url?: string;
  technologies?: string[];
  stars?: number;
  language?: string;
  isGitHub: boolean;
};

function experienceToProject(exp: Experience): ProjectItem {
  const hasSpecificProject = exp.links && exp.links.length > 0;
  const title = hasSpecificProject
    ? `${exp.role} — ${exp.links![0].title}`
    : `${exp.role} at ${exp.company}`;

  return {
    id: exp.id,
    title,
    description: exp.description,
    date: exp.startDate,
    url: exp.companyUrl,
    technologies: exp.technologies,
    isGitHub: false,
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

  const experienceProjects = experiences
    .filter((exp) => exp.type === "professional" || exp.type === "freelance")
    .map(experienceToProject);

  const allProjects = [...experienceProjects, ...githubProjects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const projectsByYear = allProjects.reduce(
    (acc, project) => {
      const year = new Date(project.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(project);
      return acc;
    },
    {} as Record<string, ProjectItem[]>
  );

  const sortedYears = Object.keys(projectsByYear).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col gap-y-2 mb-32">
        <H2 className="animate-slide-enter">Projects</H2>
        <Small className="animate-slide-enter">
          A collection of professional work and open source projects.
        </Small>
      </div>

      {allProjects.length === 0 && (
        <Muted className="animate-slide-enter">
          <span className="font-bold">Oops!</span> Nothing to see here yet.
          Please come back later.
        </Muted>
      )}

      {allProjects.length > 0 && (
        <div className="flex flex-col gap-y-32 mt-16">
          {sortedYears.map((year, index) => {
            const delay = `${index * 0.2}s`;

            return (
              <div key={year} className="flex flex-col relative">
                <H3
                  className={cn(
                    "animate-slide-enter font-inter text-9xl",
                    "text-transparent",
                    "absolute -top-20 -left-6 md:-left-12"
                  )}
                  style={{
                    animationDelay: delay,
                    WebkitTextStroke: "1px var(--color-slate-800)",
                  }}
                >
                  {year}
                </H3>

                <div className="flex flex-col gap-y-4">
                  {projectsByYear[year].map((project, cardIndex) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      yearDelay={index * 0.2}
                      cardIndex={cardIndex}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Separator className="my-8" />

      <BackLink />
    </div>
  );
}

function ProjectCard({
  project,
  yearDelay,
  cardIndex,
}: {
  project: ProjectItem;
  yearDelay: number;
  cardIndex: number;
}) {
  const delay = `${yearDelay + cardIndex * 0.08}s`;

  const content = (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Large className="truncate">{project.title}</Large>
          {project.isGitHub && (
            <Icons.gitHub className="h-4 w-4 opacity-40 shrink-0" />
          )}
        </div>
        {project.url && (
          <Icons.arrowUpRight className="h-4 w-4 opacity-30 shrink-0 mt-1" />
        )}
      </div>

      {project.description && project.description !== "No description" && (
        <ExpandableText
          text={project.description}
          className="text-muted-foreground/70"
        />
      )}

      <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
        <Muted className="flex items-center gap-1">
          {formatDate(project.date)}
          {project.stars !== undefined && project.stars > 0 && (
            <>
              <Icons.dot className="inline" />
              <span className="flex items-center gap-1">
                <Icons.star className="h-3 w-3" />
                {project.stars}
              </span>
            </>
          )}
          {project.language && (
            <>
              <Icons.dot className="inline" />
              <span>{project.language}</span>
            </>
          )}
        </Muted>
      </div>

      {project.technologies && project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded-md bg-muted/50 text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-0.5 text-xs text-muted-foreground/50">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      )}
    </div>
  );

  const cardStyles = cn(
    "block rounded-lg px-4 py-3",
    "border border-border/50",
    "bg-background/50 backdrop-blur-sm",
    "animate-slide-enter transition-all duration-300"
  );

  if (project.url) {
    return (
      <Link
        className={cn(
          cardStyles,
          "text-muted-foreground hover:text-foreground",
          "hover:border-border hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
        )}
        href={project.url}
        target="_blank"
        style={{ animationDelay: delay }}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={cn(cardStyles, "text-muted-foreground")}
      style={{ animationDelay: delay }}
    >
      {content}
    </div>
  );
}
