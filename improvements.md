# Improvements for swapnaneel.me

This document outlines potential improvements for the Next.js portfolio/blog project, organized by category. These suggestions are based on code analysis and best practices for performance, SEO, features, and maintainability.

## 1. Performance Optimizations

- **Image Optimization**: Update the header to use Next.js `<Image>` for automatic resizing, lazy loading, and WebP conversion. Add and optimize images in blog posts.
- **Caching and ISR**: Use `revalidateTag` for on-demand revalidation via webhooks to keep content fresh without full rebuilds.
- **Bundle Analysis**: Add `@next/bundle-analyzer` to identify large dependencies. Optimize MDX processing and Shiki syntax highlighting.
- **Lazy Loading**: Implement lazy loading for components like `TableOfContents` or `ViewCounter` on post pages.
- ~~**Switch to Raw GitHub URLs for Faster Fetches**~~:

  ```typescript
  // lib/github.ts
  import {
    GITHUB_REPO_OWNER,
    GITHUB_REPO_NAME,
    GITHUB_CONTENT_PATH,
    GITHUB_BRANCH,
  } from "@/lib/constants";

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  // Helper to fetch directory contents from GitHub API (keep as-is, since raw URLs don't support directory listing)
  export async function getGitHubDirectoryContents() {
    const branch = GITHUB_BRANCH || "main"; // Ensure a default branch
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_CONTENT_PATH}?ref=${branch}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
        },
        cache: "force-cache",
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch directory contents");
    return res.json();
  }

  // Updated: Use raw.githubusercontent.com for faster, direct content fetching (no base64 decoding needed)
  export async function getGitHubFileContent(filePath: string) {
    const branch = GITHUB_BRANCH || "main"; // Ensure a default branch
    const res = await fetch(
      `https://raw.githubusercontent.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/${branch}/${filePath}`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch file content");
    return res.text(); // Direct text, no decoding
  }
  ```

- ~~**Optimize Metadata Fetching**~~:

  ```typescript
  // utils/getBlogs.ts (partial update)
  const getAllBlogMetadata = cache(async (): Promise<BlogMetadata[]> => {
    const contents = await getGitHubDirectoryContents();
    const mdxFiles = contents.filter(
      (item: any) => item.type === "file" && item.name.endsWith(".mdx")
    );

    // Fetch all metadata in parallel for speed
    const metadataPromises = mdxFiles.map(async (file: any) => {
      const rawContent = await getGitHubFileContent(file.path); // Now faster with raw URLs
      const metadata = parseBlogMetadata(rawContent);
      return {
        data: metadata,
        slug: slugify(metadata.title),
      } as BlogMetadata;
    });

    return Promise.all(metadataPromises); // Parallel execution
  });
  ```

- ~~**Enhance Caching with Cache Components**~~:

  - Implemented `use cache` directive with `cacheComponents` enabled in `next.config.ts`.
  - Replaced `unstable_cache` with native `'use cache'` and `cacheLife`.
  - Configured `getBlogs`, `getContributions`, and `getContributionCalendar` to use optimized caching.

- **Add Loading States**:
  ```tsx
  // app/posts/loading.tsx
  export default function Loading() {
    return <div>Loading posts...</div>; // Or a skeleton component
  }
  ```

## 2. SEO and Discoverability

- **Sitemap and Robots.txt**: Generate a dynamic sitemap for posts and tags. Create `app/sitemap.ts` and `app/robots.txt` to help search engines index content.

  ```typescript
  // app/sitemap.ts
  import { getBlogs } from "@/utils/getBlogs";
  import { siteMetadata } from "@/utils/siteMetadata";

  export default async function sitemap() {
    const blogs = await getBlogs();
    const posts = blogs.map((blog) => ({
      url: `${siteMetadata.siteUrl}/posts/${blog.slug}`,
      lastModified: new Date(blog.data.publishedAt),
    }));
    return [{ url: siteMetadata.siteUrl, lastModified: new Date() }, ...posts];
  }
  ```

- **Structured Data**: Add JSON-LD for blog posts (e.g., Article schema) to improve rich snippets in search results.
- **Open Graph and Twitter Cards**: Enhance per-post metadata with dynamic images and descriptions.
- **RSS Feed**: Implement an RSS feed for posts to attract subscribers.

## 3. Features and Functionality

- **Search Functionality**: Add a search bar using Fuse.js or Algolia to find posts by title, content, or tags.
- **Comments System**: Integrate Giscus (GitHub-based comments) for user engagement on posts.
- **Newsletter Signup**: Add a form via ConvertKit or Mailchimp to capture emails.
- **Related Posts**: Suggest related posts based on tags on individual post pages.
- **Drafts and Scheduling**: Support draft previews and scheduled posts.
- ~~**Fix Routing Bug**: In `app/tags/[slug]/page.tsx`, change `href={`/blog/${blog.slug}`}` to `/posts/${blog.slug}`.~~

## 4. User Experience and Design

- **Loading States and Error Handling**: Add skeleton loaders for blog lists and error boundaries for failed API calls.
- **Accessibility**: Ensure alt text for images, ARIA labels for interactive elements, and test with Lighthouse or axe-core.
- **Mobile Responsiveness**: Refine header navigation and layout for smaller screens.
- ~~**Animations and Transitions**: Use Framer Motion for subtle animations like fade-ins.~~ (Implemented View Transitions)
- ~~**Dark Mode Enhancements**: Ensure components like code blocks respect the theme.~~ (Implemented Tailwind dark mode)

## 5. Code Quality and Maintainability

- **TypeScript Strictness**: Enable `strict: true` in `tsconfig.json` to catch more errors.
- **Testing**: Add unit tests for utilities like `getBlogs` and components using Jest or Vitest.
- **Linting and Formatting**: Add Prettier and Husky for consistent code style and pre-commit hooks.
- **Environment Variables**: Secure and validate sensitive vars like `GITHUB_TOKEN`.
- **Documentation**: Expand the README with setup instructions, architecture overview, and contribution guidelines.

## 6. Security and Monitoring

- **Rate Limiting**: Add rate limiting for GitHub API fetches to prevent abuse.
- **Error Monitoring**: Integrate Sentry for runtime error tracking.
- **Content Security Policy (CSP)**: Add CSP headers in `next.config.ts` to mitigate XSS risks.

## 7. Deployment and DevOps

- **CI/CD**: Set up GitHub Actions for automated testing and deployment to Vercel.
- **Analytics Deep Dive**: Add Google Analytics 4 events for interactions like post views and theme switches.

## 8. Automation

- **Automated Publication Fetching**: Create a CLI helper script to fetch paper details from DOI/ArXiv APIs (e.g., CrossRef) and generate the JSON for `PublicationSection`, saving manual entry time while preserving control.
