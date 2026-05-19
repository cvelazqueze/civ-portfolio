"use client";

import { useQuery } from "@tanstack/react-query";
import { ExternalLink, GitFork, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/layout/section-heading";
import type { GitHubStats } from "@/lib/github";
import { siteConfig } from "@/lib/site";

async function fetchGitHub(): Promise<GitHubStats> {
  const res = await fetch("/api/github");
  if (!res.ok) throw new Error("Failed to load GitHub data");
  return res.json();
}

export function GitHubSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["github-stats"],
    queryFn: fetchGitHub,
  });

  return (
    <section id="github" className="section-padding border-t border-border/40">
      <div className="section-container">
        <SectionHeading
          eyebrow="Open Source"
          title="GitHub activity"
          description="Live repository data—cached at the edge, presented as an engineering dashboard, not a widget embed."
        />

        {isLoading && (
          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-32" />
            <Skeleton className="h-32 md:col-span-2" />
          </div>
        )}

        {isError && (
          <p className="text-sm text-muted-foreground">
            GitHub data unavailable. Set GITHUB_TOKEN for higher rate limits.
          </p>
        )}

        {data && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="glass-panel p-6 lg:col-span-1">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.profile.avatarUrl}
                  alt=""
                  className="h-16 w-16 rounded-xl border border-border"
                />
                <div>
                  <p className="font-semibold">
                    {data.profile.name ?? data.profile.login}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    @{data.profile.login}
                  </p>
                </div>
              </div>
              {data.profile.bio && (
                <p className="mt-4 text-sm text-muted-foreground">
                  {data.profile.bio}
                </p>
              )}
              <dl className="mt-6 grid grid-cols-3 gap-2 text-center">
                <div>
                  <dt className="text-xs text-muted-foreground">Repos</dt>
                  <dd className="text-lg font-semibold">
                    {data.profile.publicRepos}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Followers</dt>
                  <dd className="text-lg font-semibold">
                    {data.profile.followers}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Following</dt>
                  <dd className="text-lg font-semibold">
                    {data.profile.following}
                  </dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-2">
                {data.languages.map((lang) => (
                  <Badge key={lang.name} variant="outline">
                    {lang.name} · {lang.count}
                  </Badge>
                ))}
              </div>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                View profile <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="space-y-3 lg:col-span-2">
              {data.repos.map((repo) => (
                <Link
                  key={repo.id}
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel block p-4 transition-colors hover:border-primary/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-sm font-medium">
                        {repo.name}
                      </p>
                      {repo.description && (
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                          {repo.description}
                        </p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-2">
                        {repo.language && (
                          <Badge variant="secondary">{repo.language}</Badge>
                        )}
                        {repo.topics.slice(0, 3).map((t) => (
                          <Badge key={t} variant="outline">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" />
                        {repo.stargazersCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" />
                        {repo.forksCount}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
