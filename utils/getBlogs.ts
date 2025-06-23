import { ReactElement, JSXElementConstructor, cache } from 'react'
import { compileMDX } from "next-mdx-remote/rsc";
import { compareDesc } from 'date-fns'
import { slug as slugify } from 'github-slugger'
import { getGitHubDirectoryContents, getGitHubFileContent } from '@/lib/github'
import {
  remarkFrontmatter,
  remarkMdxFrontmatter,
  rehypeSlug,
  rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions,
  rehypePrettyCode, rehypePrettyCodeOptions,
  remarkGfm,
} from '@/lib/mdx';

export interface BlogData {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  isPublished: boolean
  tags: string[]
}

export interface Blog {
  data: BlogData
  slug: string
  content: ReactElement<any, string | JSXElementConstructor<any>>
  rawContent: string
}

// Function Expression to read and parse all blog files from GitHub
export const getAllBlogsFromGitHub = cache(async (): Promise<Blog[]> => {
  // Get the list of files in the content directory
  const contents = await getGitHubDirectoryContents();

  // Filter for markdown/MDX files
  const mdxFiles = contents.filter((item: any) =>
    item.type === 'file' && (item.name.endsWith('.mdx'))
  );

  // Fetch content for each file concurrently
  const blogPromises = mdxFiles.map(async (file: any) => {
    // file.path is the full path from the root of the repo (e.g., 'content/posts/my-post.mdx')
    const rawContent = await getGitHubFileContent(file.path);

    // Use compileMDX to parse content and frontmatter
    const { content, frontmatter } = await compileMDX<BlogData>({
      source: rawContent,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
            [rehypePrettyCode, rehypePrettyCodeOptions],
          ],
        },
        parseFrontmatter: true,
      },
    });

    return {
      data: frontmatter,
      slug: slugify(frontmatter.title),
      content: content,
      rawContent: rawContent,
    } as Blog;
  });

  return Promise.all(blogPromises);
});

// Get all blogs, showing drafts only in development
export async function getBlogs(): Promise<Blog[]> {
  const allBlogs = await getAllBlogsFromGitHub();
  const blogs = allBlogs.sort((a, b) =>
    compareDesc(new Date(a.data.publishedAt), new Date(b.data.publishedAt))
  );
  if (process.env.NODE_ENV === "development") {
    return blogs; // Show all blogs, including drafts
  }
  return blogs.filter((blog) => blog.data.isPublished); // Only published blogs in production
}

// Get blogs by tag/category
export async function getBlogsByTag(tag: string): Promise<Blog[]> {
  const allBlogs = await getBlogs(); // Await the async getBlogs
  return allBlogs.filter((blog) =>
    blog.data.tags?.some((t) => slugify(t) === tag)
  );
}

// Get a single blog by slug
export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  const allBlogs = await getBlogs(); // Await the async getBlogs
  return allBlogs.find((blog) => blog.slug === slug);
}

// Get all unique tags from published blogs
export async function getAllTags(): Promise<string[]> {
  const allBlogs = await getBlogs(); // Await the async getBlogs
  const tags: string[] = [];
  allBlogs.forEach((blog) => {
    if (blog.data.isPublished) {
      blog.data.tags?.forEach((tag) => {
        const slugified = slugify(tag);
        if (!tags.includes(slugified)) {
          tags.push(slugified);
        }
      });
    }
  });
  return tags;
}