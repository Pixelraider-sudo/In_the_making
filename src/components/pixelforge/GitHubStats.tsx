import { useQuery } from "@tanstack/react-query";
import { Github, Users, GitFork, Star, BookMarked } from "lucide-react";
import { Section } from "./Section";

/**
 * Live GitHub activity — pulled from the real public GitHub REST API
 * for github.com/Pixelraider-sudo, not hardcoded numbers. No API key
 * needed for these read-only public endpoints.
 *
 * Deliberately shows a real loading state and a real error state
 * (rather than silently falling back to fake/placeholder numbers) —
 * if the API is unreachable or rate-limited, the section says so
 * instead of showing confident-looking data that isn't real.
 */

const GITHUB_USERNAME = "Pixelraider-sudo";

type GitHubUser = {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

type GitHubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
};

async function fetchGitHubProfile(): Promise<{ user: GitHubUser; repos: GitHubRepo[] }> {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`),
  ]);

  if (!userRes.ok || !reposRes.ok) {
    throw new Error("GitHub API request failed");
  }

  const user = (await userRes.json()) as GitHubUser;
  const repos = (await reposRes.json()) as GitHubRepo[];

  return { user, repos };
}

export function GitHubStats() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["github-profile", GITHUB_USERNAME],
    queryFn: fetchGitHubProfile,
    staleTime: 1000 * 60 * 30, // 30 min — this data doesn't need to be second-fresh
    retry: 1,
  });

  const totalStars = data?.repos.reduce((sum, r) => sum + r.stargazers_count, 0) ?? 0;

  return (
    <Section
      id="github"
      tag="Live Activity"
      title="On GitHub"
      intro="Pulled live from the GitHub API — real repos, real numbers, not a static snapshot."
    >
      {isLoading && (
        <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          Fetching live GitHub data…
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-border bg-card/40 px-5 py-4 text-sm text-muted-foreground">
          Couldn't reach the GitHub API right now.{" "}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            View the profile directly on GitHub →
          </a>
        </div>
      )}

      {data && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard icon={BookMarked} label="Public repos" value={data.user.public_repos} />
            <StatCard icon={Users} label="Followers" value={data.user.followers} />
            <StatCard icon={Star} label="Total stars" value={totalStars} />
            <StatCard
              icon={Github}
              label="Member since"
              value={new Date(data.user.created_at).getFullYear()}
            />
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {data.repos.slice(0, 4).map((repo) => (
              <li key={repo.name}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col gap-1 rounded-lg border border-border bg-card/40 px-4 py-3 transition-colors hover:border-primary/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-medium text-foreground group-hover:text-primary">
                      {repo.name}
                    </span>
                    <span className="flex items-center gap-3 text-xs text-muted-foreground">
                      {repo.language && <span>{repo.language}</span>}
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" /> {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3 w-3" /> {repo.forks_count}
                      </span>
                    </span>
                  </div>
                  {repo.description && (
                    <p className="text-xs text-muted-foreground line-clamp-1">{repo.description}</p>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Github;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border border-border bg-card/40 px-4 py-4 text-center">
      <Icon className="mx-auto mb-2 h-4 w-4 text-primary" />
      <div className="font-mono text-xl font-semibold text-foreground">{value}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
