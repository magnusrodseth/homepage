"use client";

import { GitHubCalendar } from "react-github-calendar";
import { H3 } from "@/components/ui/typography";

const GITHUB_USERNAME = "magnusrodseth";

export function GitHubContributions() {
  return (
    <section className="mt-16 animate-slide-enter delay-600">
      <H3 className="mb-6 text-xl">GitHub Activity</H3>

      <div className="overflow-x-auto">
        <GitHubCalendar
          username={GITHUB_USERNAME}
          colorScheme="dark"
          blockSize={12}
          blockMargin={4}
          fontSize={14}
        />
      </div>
    </section>
  );
}
