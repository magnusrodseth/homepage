"use client";

import { useState } from "react";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { H3, Large, Muted } from "@/components/ui/typography";
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
  const [active, setActive] = useState<string>("all");

  const availableCategories = CATEGORY_ORDER.filter((category) =>
    projects.some((project) => project.category === category)
  );
  const tabs: { value: string; label: string }[] = [
    { value: "all", label: "All" },
    ...availableCategories.map((category) => ({
      value: category,
      label: CATEGORY_LABELS[category],
    })),
  ];

  const filtered =
    active === "all"
      ? projects
      : projects.filter((project) => project.category === active);

  const years = groupByYear(filtered);

  return (
    <div>
      <Tabs value={active} onValueChange={setActive} className="mb-16">
        <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "animate-slide-enter rounded-full border border-border/50 bg-background/50 px-3 py-1 backdrop-blur-sm",
                "text-muted-foreground transition-all hover:text-foreground",
                "data-[state=active]:border-border data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-none"
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
        <div className="flex flex-col gap-y-32 pt-12">
          {years.map(([year, yearProjects], index) => {
            const delay = `${index * 0.2}s`;

            return (
              <div key={year} className="flex flex-col relative">
                <H3
                  className={cn(
                    "animate-slide-enter font-inter text-9xl",
                    "text-transparent pointer-events-none select-none",
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
                  {yearProjects.map((project, cardIndex) => (
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
