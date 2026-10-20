import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ArrowUpRight,
  BookMarked,
  Code2,
  GitFork,
  Github,
  Globe2,
  RefreshCw,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Section } from "./Section";

const GITHUB_USERNAME = "Pixelraider-sudo";
const GITHUB_PROFILE = `https://github.com/${GITHUB_USERNAME}`;

type GitHubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
};

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
  archived: boolean;
};

type GitHubData = {
  user: GitHubUser;
  repos: GitHubRepo[];
};

async function fetchGitHubProfile(): Promise<GitHubData> {
  const headers = {
    Accept: "application/vnd.github+json",
  };

  const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });

  if (!userResponse.ok) {
    throw new Error("Unable to fetch GitHub profile.");
  }

  const user = (await userResponse.json()) as GitHubUser;
  const repos: GitHubRepo[] = [];

  // Fetch every page of public repositories so the total-star count
  // isn't incorrectly calculated from only the latest six repositories.
  for (let page = 1; ; page += 1) {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=updated&per_page=100&page=${page}`,
      { headers },
    );

    if (!response.ok) {
      throw new Error("Unable to fetch GitHub repositories.");
    }

    const batch = (await response.json()) as GitHubRepo[];
    repos.push(...batch);

    if (batch.length < 100) break;
  }

  return { user, repos };
}

export function GitHubStats() {
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["github-profile", GITHUB_USERNAME],
    queryFn: fetchGitHubProfile,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });

  const repos = data?.repos ?? [];

  const totalStars = repos.reduce((total, repo) => total + repo.stargazers_count, 0);

  const totalForks = repos.reduce((total, repo) => total + repo.forks_count, 0);

  const activeRepos = repos.filter((repo) => !repo.archived && !repo.fork);

  const stats = data
    ? [
        {
          label: "Public repositories",
          value: data.user.public_repos,
          icon: BookMarked,
          detail: "Publicly available",
        },
        {
          label: "Followers",
          value: data.user.followers,
          icon: Users,
          detail: "Growing the network",
        },
        {
          label: "Repository stars",
          value: totalStars,
          icon: Star,
          detail: "Across public repos",
        },
        {
          label: "Total forks",
          value: totalForks,
          icon: GitFork,
          detail: "Across public repos",
        },
      ]
    : [];

  return (
    <Section
      id="github"
      tag="Live Engineering Activity"
      title="Building in public."
      intro="A live look at my open-source work, experiments, and progress as a software engineer. Every number comes from GitHub."
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50">
        {/* Technical background accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative">
          {/* Profile header */}
          <div className="flex flex-col gap-5 border-b border-border/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex min-w-0 items-center gap-4">
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open GitHub profile in a new tab"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary transition-colors hover:bg-primary/15"
              >
                <Github className="h-7 w-7" />
              </a>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {data?.user.name || GITHUB_USERNAME}
                  </h3>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Public profile
                  </span>
                </div>

                <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
                  @{GITHUB_USERNAME}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Software engineering · Open source · Continuous learning
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => void refetch()}
                disabled={isFetching}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
                Refresh
              </button>

              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                View GitHub
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="p-5 sm:p-7" role="status">
              <div className="mb-5 flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                Connecting to GitHub…
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-28 animate-pulse rounded-xl border border-border bg-muted/30"
                  />
                ))}
              </div>

              <span className="sr-only">Fetching live GitHub statistics.</span>
            </div>
          )}

          {/* Error state */}
          {isError && !isLoading && (
            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-background/60 p-5">
                <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

                <div>
                  <h4 className="text-sm font-semibold">GitHub data is temporarily unavailable.</h4>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    The live statistics couldn't be loaded. You can retry or visit the profile
                    directly.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <button
                      type="button"
                      onClick={() => void refetch()}
                      className="font-medium text-primary hover:underline"
                    >
                      Try again
                    </button>

                    <a
                      href={GITHUB_PROFILE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                    >
                      Open GitHub
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Live statistics and repositories */}
          {data && !isLoading && (
            <div className="p-5 sm:p-7">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Profile metrics
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Live public account data</p>
                </div>

                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  API connected
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((stat) => (
                  <StatCard
                    key={stat.label}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    detail={stat.detail}
                  />
                ))}
              </div>

              {/* Repository list */}
              <div className="mt-9">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Selected repositories
                    </p>
                    <h4 className="mt-1 text-lg font-semibold tracking-tight">Work in progress.</h4>
                  </div>

                  <span className="text-xs text-muted-foreground">Sorted by recent updates</span>
                </div>

                {repos.length > 0 ? (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {repos
                      .filter((repo) => !repo.archived)
                      .slice(0, 6)
                      .map((repo) => (
                        <li key={repo.id}>
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex h-full min-w-0 flex-col rounded-xl border border-border bg-background/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex min-w-0 items-center gap-2.5">
                                <Code2 className="h-4 w-4 shrink-0 text-primary" />
                                <span className="truncate font-mono text-sm font-medium transition-colors group-hover:text-primary">
                                  {repo.name}
                                </span>
                              </div>

                              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                            </div>

                            <p className="mt-3 min-h-[2.5rem] text-xs leading-5 text-muted-foreground">
                              {repo.description ||
                                "An ongoing project in my software engineering journey."}
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/70 pt-3 text-[11px] text-muted-foreground">
                              {repo.language && (
                                <span className="inline-flex items-center gap-1.5">
                                  <span className="h-2 w-2 rounded-full bg-primary/80" />
                                  {repo.language}
                                </span>
                              )}

                              <span className="inline-flex items-center gap-1">
                                <Star className="h-3.5 w-3.5" />
                                {repo.stargazers_count}
                              </span>

                              <span className="inline-flex items-center gap-1">
                                <GitFork className="h-3.5 w-3.5" />
                                {repo.forks_count}
                              </span>

                              {repo.fork && (
                                <span className="rounded border border-border px-1.5 py-0.5">
                                  Fork
                                </span>
                              )}
                            </div>
                          </a>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p className="rounded-xl border border-border p-5 text-sm text-muted-foreground">
                    No public repositories are available to display yet.
                  </p>
                )}
              </div>

              {/* Profile footer */}
              <div className="mt-6 flex flex-col gap-3 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-muted-foreground">
                  Member since {new Date(data.user.created_at).getFullYear()}. Showing real public
                  GitHub data.
                </p>

                <a
                  href={`${GITHUB_PROFILE}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-2 text-xs font-semibold text-primary hover:underline"
                >
                  Explore all repositories
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: LucideIcon;
  label: string;
  value: number | string;
  detail: string;
}) {
  return (
    <div className="group rounded-xl border border-border bg-background/65 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] leading-4 text-muted-foreground sm:text-xs">{label}</span>

        <Icon className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:scale-110" />
      </div>

      <p className="mt-4 font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {value.toLocaleString()}
      </p>

      <p className="mt-1 text-[10px] leading-4 text-muted-foreground">{detail}</p>
    </div>
  );
}
