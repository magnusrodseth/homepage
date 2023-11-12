import Image from "next/image";
import Link from "next/link";
import { Project, allPosts, allProjects } from "contentlayer/generated";
import { compareDesc } from "date-fns";

import { cn, formatDate } from "@/lib/utils";
import { H2, Large, Muted, P, Small } from "@/components/ui/typography";
import BackLink from "@/components/back-link";
import { Icons } from "@/components/icons";
import { formatReadingTime } from "@/lib/readingTime";

export const metadata = {
  title: "Projects",
};

export default async function ProjectsPage() {
  const projects = allProjects
    .filter((project) => project.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col gap-y-2">
        <H2 className="animate-slide-enter">Projects</H2>
        <Small className="animate-slide-enter mb-8">
          A collection of professional and personal projects I have worked on
          throughout my career.
        </Small>
      </div>

      <div className="flex flex-col gap-y-4">
        {projects.map((project, index) => {
          const delay = `${index * 0.2}s`;

          return (
            <Link
              key={project._id}
              className={cn(
                "flex justify-start items-center gap-x-2 text-muted-foreground hover:text-slate-50",
                "animate-slide-enter transition-all"
              )}
              href={`/projects/${project.slugAsParams}`}
              style={{ animationDelay: delay }}
            >
              <Large>{project.title}</Large>

              <Muted className="flex justify-center items-center">
                {formatDate(project.date)} <Icons.dot className="inline" />{" "}
                {formatReadingTime(project.readingTimeInMinutes)}
              </Muted>
            </Link>
          );
        })}
      </div>

      <BackLink />
    </div>
  );
}
