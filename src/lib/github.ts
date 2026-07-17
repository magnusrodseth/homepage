import { Octokit } from "octokit";
import { GitHubRepo } from "./data/types";

const IGNORED_REPOS = new Set([
  "magnusrodseth", // profile README
  "docker-course",
  "data-structures-and-algorithms",
  "complete-sql-mastery",
  "it2810-project-1",
  "it2810-project-2",
  "it2810-project-3",
  "it2810-project-4",
  "sobekkseter-upload",
  "rod",
  "rodseth-consulting",
  "tdt4259-aneo",
  "ledig",
  "plotify",
  "geo-genius",
]);

function getOctokit() {
  return new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
}

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionCalendar = {
  total: number;
  weeks: ContributionDay[][];
};

const CONTRIBUTION_LEVELS: Record<string, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export async function getContributionCalendar(
  username: string,
): Promise<ContributionCalendar | null> {
  if (!process.env.GITHUB_TOKEN) {
    console.warn("GITHUB_TOKEN not set, cannot fetch contribution calendar");
    return null;
  }

  try {
    const octokit = getOctokit();
    const { user } = await octokit.graphql<{
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: number;
            weeks: Array<{
              contributionDays: Array<{
                date: string;
                contributionCount: number;
                contributionLevel: string;
              }>;
            }>;
          };
        };
      };
    }>(
      `
      query ($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `,
      { username },
    );

    const calendar = user.contributionsCollection.contributionCalendar;
    return {
      total: calendar.totalContributions,
      weeks: calendar.weeks.map((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: CONTRIBUTION_LEVELS[day.contributionLevel] ?? 0,
        })),
      ),
    };
  } catch (error) {
    console.error("Failed to fetch contribution calendar:", error);
    return null;
  }
}

export async function getRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const octokit = getOctokit();
    const { data: repos } = await octokit.rest.repos.listForUser({
      username,
      sort: "pushed",
      direction: "desc",
      per_page: 100,
    });

    return repos
      .filter((repo) => !repo.fork && !repo.archived && !IGNORED_REPOS.has(repo.name))
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        htmlUrl: repo.html_url,
        homepage: repo.homepage ?? null,
        stargazersCount: repo.stargazers_count ?? 0,
        forksCount: repo.forks_count ?? 0,
        language: repo.language ?? null,
        topics: repo.topics || [],
        pushedAt: repo.pushed_at || "",
        createdAt: repo.created_at || "",
        fork: repo.fork ?? false,
        archived: repo.archived || false,
      }));
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}

export async function getPinnedRepos(username: string): Promise<GitHubRepo[]> {
  if (!process.env.GITHUB_TOKEN) {
    console.warn("GITHUB_TOKEN not set, cannot fetch pinned repos");
    return [];
  }

  try {
    const octokit = getOctokit();
    const { user } = await octokit.graphql<{
      user: {
        pinnedItems: {
          nodes: Array<{
            id: string;
            name: string;
            nameWithOwner: string;
            description: string | null;
            url: string;
            homepageUrl: string | null;
            stargazerCount: number;
            forkCount: number;
            primaryLanguage: { name: string } | null;
            repositoryTopics: { nodes: Array<{ topic: { name: string } }> };
            pushedAt: string;
            createdAt: string;
            isFork: boolean;
            isArchived: boolean;
          }>;
        };
      };
    }>(
      `
      query ($username: String!) {
        user(login: $username) {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                id
                name
                nameWithOwner
                description
                url
                homepageUrl
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                }
                repositoryTopics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
                pushedAt
                createdAt
                isFork
                isArchived
              }
            }
          }
        }
      }
    `,
      { username },
    );

    return user.pinnedItems.nodes
      .filter((repo) => !repo.isFork && !repo.isArchived)
      .map((repo) => ({
        id: parseInt(repo.id.replace(/\D/g, ""), 10) || 0,
        name: repo.name,
        fullName: repo.nameWithOwner,
        description: repo.description,
        htmlUrl: repo.url,
        homepage: repo.homepageUrl,
        stargazersCount: repo.stargazerCount,
        forksCount: repo.forkCount,
        language: repo.primaryLanguage?.name || null,
        topics: repo.repositoryTopics.nodes.map((t) => t.topic.name),
        pushedAt: repo.pushedAt,
        createdAt: repo.createdAt,
        fork: repo.isFork,
        archived: repo.isArchived,
      }));
  } catch (error) {
    console.error("Failed to fetch pinned repos:", error);
    return [];
  }
}

export async function getReposWithPinned(
  username: string,
): Promise<{ pinned: GitHubRepo[]; recent: GitHubRepo[] }> {
  const [pinned, allRepos] = await Promise.all([
    getPinnedRepos(username),
    getRepos(username),
  ]);

  const pinnedIds = new Set(pinned.map((r) => r.id));
  const recent = allRepos.filter((r) => !pinnedIds.has(r.id));

  return { pinned, recent };
}
