"use client";

import { useState } from "react";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { H3, Muted } from "@/components/ui/typography";
import { Icons } from "@/components/icons";
import { ExpandableText } from "@/components/expandable-text";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ProjectCategory =
  | "professional"
  | "freelance"
  | "internship"
  | "volunteer"
  | "education"
  | "open-source";

export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  url?: string;
  technologies?: string[];
  stars?: number;
  language?: string;
  isGitHub: boolean;
  category: ProjectCategory;
  /** Shown in the default, curated "Selected" view. */
  featured: boolean;
};

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  professional: "Work",
  freelance: "Freelance",
  internship: "Internships",
  "open-source": "Open source",
  education: "Education",
  volunteer: "Volunteer",
};

const CATEGORY_ORDER: ProjectCategory[] = [
  "professional",
  "freelance",
  "internship",
  "open-source",
  "education",
  "volunteer",
];

function groupByYear(projects: ProjectItem[]): [string, ProjectItem[]][] {
  const byYear = projects.reduce(
    (acc, project) => {
      const year = new Date(project.date).getFullYear().toString();
      (acc[year] ??= []).push(project);
      return acc;
    },
    {} as Record<string, ProjectItem[]>
  );

  return Object.keys(byYear)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .map((year) => [year, byYear[year]]);
}

export function ProjectsExplorer({ projects }: { projects: ProjectItem[] }) {
  const hasFeatured = projects.some((project) => project.featured);
  const [active, setActive] = useState<string>(
    hasFeatured ? "selected" : "all"
  );

  const availableCategories = CATEGORY_ORDER.filter((category) =>
    projects.some((project) => project.category === category)
  );
  const tabs: { value: string; label: string }[] = [
    ...(hasFeatured ? [{ value: "selected", label: "Selected" }] : []),
    { value: "all", label: "All" },
    ...availableCategories.map((category) => ({
      value: category,
      label: CATEGORY_LABELS[category],
    })),
  ];

  const filtered =
    active === "all"
      ? projects
      : active === "selected"
        ? projects.filter((project) => project.featured)
        : projects.filter((project) => project.category === active);

  const years = groupByYear(filtered);

  return (
    <div>
      <Tabs value={active} onValueChange={setActive} className="mb-8">
        <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "animate-slide-enter rounded-full border border-border/50 bg-background/50 px-3 py-1 backdrop-blur-sm",
                "text-muted-foreground transition-all hover:text-foreground",
                "data-[state=active]:border-primary/50 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none"
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <Muted className="animate-slide-enter">
          <span className="font-bold">Oops!</span> Nothing in this category yet.
        </Muted>
      ) : (
        <div className="flex flex-col gap-y-16 pt-12">
          {years.map(([year, yearProjects], index) => {
            const delay = `${index * 0.15}s`;

            return (
              <div key={year} className="flex flex-col relative">
                <H3
                  aria-hidden="true"
                  className={cn(
                    "animate-slide-enter font-sans text-9xl",
                    "text-transparent pointer-events-none select-none",
                    "absolute -top-14 -left-6 md:-left-12"
                  )}
                  style={{
                    animationDelay: delay,
                    WebkitTextStroke: "1px var(--color-slate-600)",
                  }}
                >
                  {year}
                </H3>

                <div className="flex flex-col gap-y-4">
                  {yearProjects.map((project, cardIndex) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      yearDelay={index * 0.15}
                      cardIndex={cardIndex}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
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
  const delay = `${yearDelay + cardIndex * 0.06}s`;

  const content = (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-lg font-semibold text-foreground">
            {project.title}
          </span>
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
          className="text-muted-foreground"
        />
      )}

      <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
        <Muted className="flex items-center gap-1 font-mono text-xs">
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
            <span className="px-2 py-0.5 text-xs text-muted-foreground">
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
          "hover:border-primary/40 hover:shadow-[0_0_15px_hsl(var(--primary)/0.08)]"
        )}
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ animationDelay: delay }}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={cardStyles} style={{ animationDelay: delay }}>
      {content}
    </div>
  );
}
