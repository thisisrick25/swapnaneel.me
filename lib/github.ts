import { Octokit } from "@octokit/core";

// Configure your GitHub Repository details
export const GITHUB_REPO_OWNER = 'thisisrick25'
export const GITHUB_REPO_NAME = 'posts'
export const GITHUB_BRANCH = '' // Default branch, usually 'main' or 'master'
export const GITHUB_CONTENT_PATH = '' // Path to the content directory, e.g., 'content/posts'

// Initialize Octokit (consider using process.env.GITHUB_TOKEN for private repos or higher rate limits)
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Helper to fetch directory contents from GitHub API using Octokit
export async function getGitHubDirectoryContents(owner: string, repo: string, branch: string, filePath: string) {
  try {
    console.log('GitHub Token Loaded:', !!process.env.GITHUB_TOKEN); // Should print 'true' if loaded

    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path: filePath,
      ref: branch,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    console.log('GitHub API Response:', response);

    // The data is an array of content items (files/directories)
    // Ensure the response data is an array (it can be an object if path points to a file)
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      // If a single file was requested, return it in an array for consistent handling
      return [response.data];
    }
  } catch (error: any) {
    // Octokit errors have a response object with status
    if (error.response) {
      console.error(`Error fetching GitHub directory contents: ${error.response.status} - ${error.response.data.message}`);
      throw new Error(`Failed to fetch GitHub directory contents: ${error.response.status}`);
    } else {
      console.error(`Unexpected error fetching GitHub directory contents: ${error.message}`);
      throw new Error(`Unexpected error fetching GitHub directory contents: ${error.message}`);
    }
  }
}

// Helper to fetch raw file content from GitHub (still using raw.githubusercontent.com for simplicity)
export async function getGitHubFileContent(owner: string, repo: string, branch: string, filePath: string) {
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path: filePath,
      ref: branch,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        'Accept': 'application/vnd.github.v3+json',
      }
    });
    console.log('GitHub API Response for file content:', response);

    // GitHub API returns a single object for file content
    if ('content' in response.data && response.data.content && response.data.encoding === 'base64') {
      // Decode the base64 content
      return Buffer.from(response.data.content, 'base64').toString('utf8');
    } else {
      throw new Error(`Could not retrieve or decode content for ${filePath}. Check if it's a file and not empty.`);
    }
  } catch (error: any) {
    if (error.response) {
      console.error(`Error fetching raw content for ${filePath}: ${error.response.status} - ${error.response.data?.message}`);
      throw new Error(`Failed to fetch raw content for ${filePath}: ${error.response.status}`);
    } else {
      console.error(`Unexpected error fetching raw content for ${filePath}: ${error.message}`);
      throw new Error(`Unexpected error fetching raw content for ${filePath}: ${error.message}`);
    }
  }
}
