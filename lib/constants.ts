// GitHub Repository Details
export const GITHUB_REPO_OWNER = 'thisisrick25'
export const GITHUB_REPO_NAME = 'posts'
export const GITHUB_BRANCH = 'main' // Default branch, usually 'main' or 'master', leave blank for default branch
export const GITHUB_CONTENT_PATH = '' // Path to the content directory, e.g., 'content/posts', leave blank for root directory

// GitHub API & Webhook
export const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;
export const GITHUB_PUSH_EVENT = 'push';
export const GITHUB_SIGNATURE_HEADER = 'x-hub-signature-256';
export const GITHUB_EVENT_HEADER = 'x-github-event';

// Revalidation
export const REVALIDATE_SECONDS = 3600; // Cache revalidation time in seconds
