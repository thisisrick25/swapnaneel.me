import { GITHUB_REPO_OWNER } from '@/lib/constants'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export type Contribution = {
  id: number;
  title: string;
  repo: string; // owner/repo
  html_url: string;
  body: string | null;
  merged_at?: string | null;
  type: 'pr' | 'issue';
  state: string;
  labels: string[];
};

async function fetchJson(url: string) {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GitHub API error: ${res.status} ${txt}`);
  }

  return res.json();
}

// Fetch merged PRs authored by the user but NOT in user's own repos/orgs
async function fetchExternalMergedPRs(): Promise<Contribution[]> {
  // Query: is:pr is:merged author:${username} -user:${username}
  const q = `is:pr is:merged author:${GITHUB_REPO_OWNER} -user:${GITHUB_REPO_OWNER}`;
  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(q)}&per_page=100`;
  const data = await fetchJson(url);
  const items = data.items || [];

  // Fetch PR details to get merged_at when available
  const contributions = await Promise.all(items.map(async (item: any) => {
    let merged_at: string | null = null;
    // If this search result points to a pull_request, fetch its details
    if (item.pull_request && item.pull_request.url) {
      try {
        const prDetails = await fetchJson(item.pull_request.url);
        merged_at = prDetails?.merged_at || null;
      } catch (e) {
        // ignore errors and fall back
        merged_at = null;
      }
    }

    return {
      id: item.id,
      title: item.title,
      repo: (item.repository_url || '').split('/').slice(-2).join('/'),
      html_url: item.html_url,
      body: item.body || null,
      merged_at,
      type: 'pr',
      state: item.state,
      labels: (item.labels || []).map((l: any) => l.name || l),
    } as Contribution;
  }));

  return contributions;
}

export async function getExternalMergedContributions(): Promise<Contribution[]> {
  try {
    const prs = await fetchExternalMergedPRs();
    // sort by merged_at (most recent first). If merged_at is missing, treat as very old.
    prs.sort((a, b) => {
      const da = a.merged_at ? new Date(a.merged_at).getTime() : 0;
      const db = b.merged_at ? new Date(b.merged_at).getTime() : 0;
      return db - da;
    });
    return prs;
  } catch (error) {
    console.error('Failed to fetch external merged contributions', error);
    return [];
  }
}
