// Configure your GitHub Repository details
const REPO_OWNER = 'thisisrick25'
const REPO_NAME = 'posts'
const BRANCH = '' // Default branch, usually 'main' or 'master'
const CONTENT_PATH = '' // Path to the content directory, e.g., 'content/posts'

// Initialize Octokit (consider using process.env.GITHUB_TOKEN for private repos or higher rate limits)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Helper to fetch directory contents from GitHub API using Octokit
export async function getGitHubDirectoryContents() {
  console.log('Fetching from GitHub:', CONTENT_PATH);
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_PATH}?ref=${BRANCH}`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
      },
      cache: 'force-cache',
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error('Failed to fetch directory contents');
  return res.json();
}

// Helper to fetch raw file content from GitHub (still using raw.githubusercontent.com for simplicity)
export async function getGitHubFileContent(filePath: string) {
  console.log('Fetching from GitHub:', filePath || CONTENT_PATH);
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}?ref=${BRANCH}`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
      },
      cache: 'force-cache',
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error('Failed to fetch file content');
  const data = await res.json();
  // Decode base64 content
  if (!data.content) throw new Error('No content found in GitHub API response');
  return Buffer.from(data.content, 'base64').toString('utf-8');
}
