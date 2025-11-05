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
  relatedIssues?: { number: number; url: string }[];
};

// Minimal GraphQL fetch helper
async function fetchGraphQL(query: string) {
  if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN is required for GraphQL requests');

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
    cache: 'no-store',
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(`GitHub GraphQL error: ${res.status} ${JSON.stringify(json)}`);
  }
  if (json.errors) {
    // don't fail hard for individual errors, but surface them
    console.warn('GitHub GraphQL returned errors', json.errors);
  }

  return json.data || {};
}

// NOTE: We rely on GraphQL `closingIssuesReferences` for related issues.

// Fetch merged PRs authored by the user but NOT in user's own repos/orgs using GraphQL
async function fetchExternalMergedPRs(): Promise<Contribution[]> {
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is required for GraphQL search to fetch contributions');
  }

  const q = `is:pr is:merged author:${GITHUB_REPO_OWNER} -user:${GITHUB_REPO_OWNER}`;

  const graphQuery = `query {\n    search(query: \"${q.replace(/\\/g, '\\\\').replace(/\"/g, '\\\"')}\", type: ISSUE, first: 100) {\n      nodes {\n        ... on PullRequest {\n          id\n          number\n          title\n          body\n          bodyText\n          url\n          mergedAt\n          state\n          repository { nameWithOwner }\n          labels(first: 10) { nodes { name } }\n          closingIssuesReferences(first: 10) { nodes { number url } }\n        }\n      }\n    }\n  }`;

  const data = await fetchGraphQL(graphQuery);
  const nodes = (data?.search?.nodes) || [];

  const contributions: Contribution[] = nodes.map((n: any) => {
    const repo = n.repository?.nameWithOwner || '';
    const relatedIssues = (n.closingIssuesReferences?.nodes || []).map((r: any) => ({ number: r.number, url: r.url })) || [];

    return {
      id: n.id,
      title: n.title,
      repo,
      html_url: n.url,
      body: n.body || n.bodyText || null,
      merged_at: n.mergedAt || null,
      type: 'pr',
      state: n.state || 'merged',
      relatedIssues,
    } as Contribution;
  });

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
    // If the error is about a missing GITHUB_TOKEN, rethrow so callers notice
    if (error instanceof Error && /GITHUB_TOKEN/.test(error.message)) {
      throw error;
    }
    console.error('Failed to fetch external merged contributions', error);
    return [];
  }
}
