import { siteConfig } from "@/lib/site";

export interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  avatarUrl: string;
  htmlUrl: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  pushedAt: string;
  topics: string[];
}

export interface GitHubStats {
  profile: GitHubProfile;
  repos: GitHubRepo[];
  languages: { name: string; count: number }[];
  recentActivity: { type: string; repo: string; date: string }[];
}

const GITHUB_API = "https://api.github.com";

async function githubFetch<T>(path: string): Promise<T> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(`${GITHUB_API}${path}`, {
    headers,
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getGitHubStats(): Promise<GitHubStats> {
  const username = siteConfig.githubUsername;

  const [user, repos] = await Promise.all([
    githubFetch<{
      login: string;
      name: string | null;
      bio: string | null;
      public_repos: number;
      followers: number;
      following: number;
      avatar_url: string;
      html_url: string;
    }>(`/users/${username}`),
    githubFetch<
      Array<{
        id: number;
        name: string;
        description: string | null;
        html_url: string;
        language: string | null;
        stargazers_count: number;
        forks_count: number;
        pushed_at: string;
        topics?: string[];
      }>
    >(`/users/${username}/repos?sort=pushed&per_page=8`),
  ]);

  const languageMap = new Map<string, number>();
  for (const repo of repos) {
    if (repo.language) {
      languageMap.set(repo.language, (languageMap.get(repo.language) ?? 0) + 1);
    }
  }

  const languages = Array.from(languageMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return {
    profile: {
      login: user.login,
      name: user.name,
      bio: user.bio,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      avatarUrl: user.avatar_url,
      htmlUrl: user.html_url,
    },
    repos: repos.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      htmlUrl: r.html_url,
      language: r.language,
      stargazersCount: r.stargazers_count,
      forksCount: r.forks_count,
      pushedAt: r.pushed_at,
      topics: r.topics ?? [],
    })),
    languages,
    recentActivity: repos.slice(0, 5).map((r) => ({
      type: "push",
      repo: r.name,
      date: r.pushed_at,
    })),
  };
}

export function getMockGitHubStats(): GitHubStats {
  return {
    profile: {
      login: siteConfig.githubUsername,
      name: siteConfig.name,
      bio: "Full stack engineer · backend-focused · AI-native workflows",
      publicRepos: 24,
      followers: 12,
      following: 18,
      avatarUrl: `https://github.com/${siteConfig.githubUsername}.png`,
      htmlUrl: siteConfig.links.github,
    },
    repos: [
      {
        id: 1,
        name: "notification-system",
        description: "Multi-channel notification platform",
        htmlUrl: "https://github.com/cvelazqueze/notification-system",
        language: "TypeScript",
        stargazersCount: 3,
        forksCount: 0,
        pushedAt: new Date().toISOString(),
        topics: ["nestjs", "nextjs"],
      },
      {
        id: 2,
        name: "simple-react-tutorial",
        description: "Interactive React learning surface",
        htmlUrl: "https://github.com/cvelazqueze/simple-react-tutorial",
        language: "JavaScript",
        stargazersCount: 2,
        forksCount: 1,
        pushedAt: new Date().toISOString(),
        topics: ["react", "education"],
      },
    ],
    languages: [
      { name: "TypeScript", count: 8 },
      { name: "JavaScript", count: 5 },
      { name: "Python", count: 2 },
    ],
    recentActivity: [
      { type: "push", repo: "civ-portfolio", date: new Date().toISOString() },
      { type: "push", repo: "notification-system", date: new Date().toISOString() },
    ],
  };
}
