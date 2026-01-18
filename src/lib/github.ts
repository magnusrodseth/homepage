import { Octokit } from "octokit";
import { GitHubRepo } from "./data/types";

function getOctokit() {
  return new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
}

export async function getUser(username: string) {
  try {
    const octokit = getOctokit();
    const { data } = await octokit.rest.users.getByUsername({ username });
    return data;
  } catch (error) {
    console.error("Failed to fetch GitHub user:", error);
    return null;
  }
}

export async function getRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const octokit = getOctokit();
    const { data: repos } = await octokit.rest.repos.listForUser({
      username,
      sort: "created",
      direction: "desc",
      per_page: 100,
    });

    return repos
      .filter((repo) => !repo.fork && !repo.archived)
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
  const recent = allRepos.filter((r) => !pinnedIds.has(r.id)).slice(0, 10);

  return { pinned, recent };
}
