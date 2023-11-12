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

export const metadata = {
  title: "Projects",
};

type ProjectsByYear = {
  [year: string]: Project[];
};

export default async function ProjectsPage() {
  const projects = allProjects
    .filter((project) => project.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

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
      <div className="flex flex-col gap-y-2">
        <H2 className="animate-slide-enter">Projects</H2>
        <Small className="animate-slide-enter mb-16">
          A collection of professional and personal projects I have worked on
          throughout my career.
        </Small>
      </div>

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

              <div className="flex flex-col">
                {projectsByYear[year].map((project) => (
                  <Link
                    key={project._id}
                    className="flex justify-start items-center gap-x-2 text-muted-foreground hover:text-foreground animate-slide-enter transition-all"
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

      <Separator className="my-8" />

      <BackLink />
    </div>
  );
}
