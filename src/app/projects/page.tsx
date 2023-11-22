import Image from "next/image";
import Link from "next/link";
import { Project, allPosts, allProjects } from "contentlayer/generated";
import { compareDesc } from "date-fns";

import { cn, formatDate } from "@/lib/utils";
import { H2, H3, Large, Muted, P, Small } from "@/components/ui/typography";
import BackLink from "@/components/back-link";
import { Icons } from "@/components/icons";
import { formatReadingTime } from "@/lib/readingTime";
import { Separator } from "@/components/ui/separator";
import { slate } from "tailwindcss/colors";
import FilterProjectsDropdown from "@/components/filter-projects-dropdown";
import { RouteProps } from "@/types";

export const metadata = {
  title: "Projects",
};

type ProjectsByYear = {
  [year: string]: Project[];
};

export default async function ProjectsPage({ searchParams }: RouteProps) {
  const type = searchParams.type ?? null;

  const projects = allProjects
    .filter((project) => project.published)
    .filter((project) => !type || project.slugAsParams.startsWith(type))
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  const types = allProjects
    // `/projects/professional/slug` => `professional`
    .map((project) => project.slugAsParams.split("/")[0])
    // Remove duplicates
    .filter((value, index, self) => self.indexOf(value) === index);

  const projectsByYear = projects.reduce((acc, project) => {
    const year = new Date(project.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(project);
    return acc;
  }, {} as ProjectsByYear);

  const sortedYears = Object.keys(projectsByYear).sort((a, b) =>
    compareDesc(new Date(a), new Date(b))
  );

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col gap-y-2 mb-32">
        <div className="w-full flex justify-between">
          <H2 className="animate-slide-enter">Projects</H2>
          <FilterProjectsDropdown types={types} initialType={type} />
        </div>
        <Small className="animate-slide-enter">
          A collection of professional, freelance, school and personal projects
          I have worked on throughout my career.
        </Small>
      </div>

      {projects.length === 0 && (
        <Muted className="animate-slide-enter">
          <span className="font-bold">Oops!</span> Nothing to see here yet.
          Please come back later.
        </Muted>
      )}

      {projects.length > 0 && (
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
                    WebkitTextStroke: `1px ${slate[800]}`,
                  }}
                >
                  {year}
                </H3>

                <div className="flex flex-col gap-y-4">
                  {projectsByYear[year].map((project) => (
                    <Link
                      key={project._id}
                      className="flex flex-col md:flex-row justify-start items-start md:items-center gap-x-2 text-muted-foreground hover:text-foreground animate-slide-enter transition-all"
                      href={`/projects/${project.slugAsParams}`}
                      style={{ animationDelay: delay }}
                    >
                      <Large>{project.title}</Large>

                      <Muted className="flex justify-center items-center">
                        {formatDate(project.date)}{" "}
                        <Icons.dot className="inline" />{" "}
                        {formatReadingTime(project.readingTimeInMinutes)}
                      </Muted>
                    </Link>
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
