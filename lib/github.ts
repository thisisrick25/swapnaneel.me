import {
  GITHUB_REPO_OWNER,
  GITHUB_REPO_NAME,
  GITHUB_CONTENT_PATH,
  GITHUB_BRANCH
} from '@/lib/constants';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Helper to fetch directory contents from GitHub API using Octokit
export async function getGitHubDirectoryContents() {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_CONTENT_PATH}?ref=${GITHUB_BRANCH}`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
      },
      cache: 'force-cache',
      next: { revalidate: 1800 },
    }
  );
  if (!res.ok) throw new Error('Failed to fetch directory contents');
  return res.json();
}

// Helper to fetch raw file content from GitHub (still using raw.githubusercontent.com for simplicity)
export async function getGitHubFileContent(filePath: string) {
  const branch = GITHUB_BRANCH || 'main'; // Ensure a default branch
  const res = await fetch(
    `https://raw.githubusercontent.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/${branch}/${filePath}`,
    {
      cache: 'force-cache',
      next: { revalidate: 1800 },
    }
  );
  if (!res.ok) throw new Error('Failed to fetch file content');
  return res.text(); // Direct text, no decoding
}
