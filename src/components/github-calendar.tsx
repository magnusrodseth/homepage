"use client";

import { GitHubCalendar } from "react-github-calendar";

const GITHUB_USERNAME = "magnusrodseth";

export function GitHubContributions() {
  return (
    <div className="overflow-x-auto">
      <GitHubCalendar
        username={GITHUB_USERNAME}
        colorScheme="dark"
        blockSize={12}
        blockMargin={4}
        fontSize={14}
      />
    </div>
  );
}
