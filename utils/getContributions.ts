import { GIT_USERNAME } from '@/lib/constants'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITLAB_TOKEN = process.env.GITLAB_TOKEN;

if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN is required for GitHub GraphQL requests');
if (!GITLAB_TOKEN) throw new Error('GITLAB_TOKEN is required for GitLab GraphQL requests');

// GraphQL Queries
const GITHUB_GRAPHQL_QUERY = `query {
  search(query: "is:pr is:merged author:${GIT_USERNAME} -user:${GIT_USERNAME}", type: ISSUE, first: 100) {
    nodes {
      ... on PullRequest {
        id
        number
        title
        body
        bodyText
        url
        mergedAt
        state
        repository { nameWithOwner }
        labels(first: 10) { nodes { name } }
        closingIssuesReferences(first: 10) { nodes { number url } }
      }
    }
  }
}`;

const GITLAB_GRAPHQL_QUERY = `query {
  user(username: "${GIT_USERNAME}") {
    authoredMergeRequests(state: merged, first: 100) {
      nodes {
        iid
        title
        description
        webUrl
        mergedAt
        state
        project { id fullPath }
        labels { nodes { title } }
      }
    }
  }
}`;

// List of PRs/MRs to ignore from contributions, format: "owner/repo#number"
const ignoredPRs = ["open-minds/awesome-openminds-team#106", "shrutikapoor08/devjoke#610"]; // e.g., ["owner/repo#123", "other/repo#456"]

export type Contribution = {
  id: number; // PR or MR number
  graphqlId?: string; // GraphQL global ID, if needed
  title: string;
  repo: string; // owner/repo
  html_url: string;
  body: string | null;
  merged_at?: string | null;
  source: 'github' | 'gitlab';
  relatedIssues?: { number: number; url: string }[];
};

// GitHub GraphQL fetch helper
async function fetchGraphQLGithub(query: string) {
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

// GitLab GraphQL fetch helper
async function fetchGraphQLGitLab(query: string) {
  const res = await fetch('https://gitlab.com/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GITLAB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
    cache: 'no-store',
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(`GitLab GraphQL error: ${res.status} ${JSON.stringify(json)}`);
  }
  if (json.errors) {
    console.warn('GitLab GraphQL returned errors', json.errors);
  }

  return json.data || {};
}

// NOTE: We rely on GraphQL `closingIssuesReferences` for related issues.

// Fetch merged MRs authored by the user but NOT in user's own repos/orgs using GraphQL
async function fetchGithubPRs(): Promise<Contribution[]> {
  const data = await fetchGraphQLGithub(GITHUB_GRAPHQL_QUERY);
  const nodes = (data?.search?.nodes) || [];

  const contributions: Contribution[] = nodes.map((n: any) => {
    const repo = n.repository?.nameWithOwner || '';
    const relatedIssues = (n.closingIssuesReferences?.nodes || []).map((r: any) => ({ number: r.number, url: r.url })) || [];

    return {
      id: n.number,
      graphqlId: n.id,
      title: n.title,
      repo,
      html_url: n.url,
      body: n.body || n.bodyText || null,
      merged_at: n.mergedAt || null,
      source: 'github',
      relatedIssues,
    } as Contribution;
  });

  return contributions;
}

// Fetch merged MRs from GitLab authored by the user
async function fetchGitLabMRs(): Promise<Contribution[]> {
  const data = await fetchGraphQLGitLab(GITLAB_GRAPHQL_QUERY);
  const nodes = (data?.user?.authoredMergeRequests?.nodes) || [];

  // Fetch related issues for each MR using REST API
  const contributions: Contribution[] = await Promise.all(nodes.map(async (n: any) => {
    const repo = n.project?.fullPath || '';
    const projectId = encodeURIComponent(repo);
    const mrIid = n.iid;

    let relatedIssues: { number: number; url: string }[] = [];
    try {
      const closesIssuesUrl = `https://gitlab.com/api/v4/projects/${projectId}/merge_requests/${mrIid}/closes_issues`;
      const res = await fetch(closesIssuesUrl, {
        headers: {
          'Authorization': `Bearer ${GITLAB_TOKEN}`,
        },
      });
      if (res.ok) {
        const issues = await res.json();
        relatedIssues = issues.map((issue: any) => ({
          number: issue.iid,
          url: issue.web_url,
        }));
      } else {
        console.warn(`Failed to fetch closes_issues for ${repo}#${mrIid}: ${res.status}`);
      }
    } catch (error) {
      console.warn(`Error fetching closes_issues for ${repo}#${mrIid}:`, error);
    }

    return {
      id: n.iid,
      graphqlId: n.id,
      title: n.title,
      repo,
      html_url: n.webUrl,
      body: n.description || null,
      merged_at: n.mergedAt || null,
      source: 'gitlab',
      relatedIssues,
    } as Contribution;
  }));

  return contributions;
}

export async function getMergedContributions(): Promise<Contribution[]> {
  const allContributions: Contribution[] = [];

  // Fetch GitHub PRs
  try {
    const prs = await fetchGithubPRs();
    allContributions.push(...prs);
  } catch (error) {
    if (error instanceof Error && /GITHUB_TOKEN/.test(error.message)) {
      console.warn('Skipping GitHub contributions: GITHUB_TOKEN not provided');
    } else {
      console.error('Failed to fetch GitLab contributions', error);
    }
  }

  // Fetch GitLab MRs
  try {
    const mrs = await fetchGitLabMRs();
    allContributions.push(...mrs);
  } catch (error) {
    if (error instanceof Error && /GITLAB_TOKEN/.test(error.message)) {
      console.warn('Skipping GitLab contributions: GITLAB_TOKEN not provided');
    } else {
      console.error('Failed to fetch GitLab contributions', error);
    }
  }

  // sort by merged_at (most recent first). If merged_at is missing, treat as very old.
  allContributions.sort((a, b) => {
    const da = a.merged_at ? new Date(a.merged_at).getTime() : 0;
    const db = b.merged_at ? new Date(b.merged_at).getTime() : 0;
    return db - da;
  });
  // Filter out ignored PRs/MRs
  return allContributions.filter(pr => !ignoredPRs.includes(`${pr.repo}#${pr.id}`));
}
