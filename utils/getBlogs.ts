import { ReactElement, JSXElementConstructor, cache } from 'react'
import { unstable_cache } from 'next/cache'
import { compileMDX } from "next-mdx-remote/rsc";
import { compareDesc } from 'date-fns'
import { slug as slugify } from 'github-slugger'
import matter from 'gray-matter'
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

export interface BlogMetadata {
  data: Pick<BlogData, 'title' | 'publishedAt' | 'updatedAt' | 'isPublished' | 'tags'>; // Only necessary data
  slug: string;
}

function parseBlogMetadata(rawContent: string): BlogMetadata['data'] {
  const { data } = matter(rawContent);
  return {
    title: data.title,
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    isPublished: data.isPublished,
    tags: data.tags || [],
  };
}

// Function to fetch and parse metadata for all blog files from GitHub
const getAllBlogMetadata = cache(async (): Promise<BlogMetadata[]> => {
  const contents = await getGitHubDirectoryContents();

  const mdxFiles = contents.filter((item: any) =>
    item.type === 'file' && (item.name.endsWith('.mdx'))
  );

  const metadataPromises = mdxFiles.map(async (file: any) => {
    const rawContent = await getGitHubFileContent(file.path);

    // Use gray-matter to quickly parse only the frontmatter
    const metadata = parseBlogMetadata(rawContent);

    return {
      data: metadata,
      slug: slugify(metadata.title), // Derive slug from title
    } as BlogMetadata;
  });

  return Promise.all(metadataPromises);
});

// Shared function to compile MDX content and extract frontmatter (uses compileMDX)
async function compileMdxContent(rawContent: string): Promise<{ content: ReactElement<any, string | JSXElementConstructor<any>>, frontmatter: BlogData }> {
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
  return { content, frontmatter };
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

// Get all blogs metadata (for lists), showing drafts only in development
export const getBlogs = unstable_cache(
  async (): Promise<BlogMetadata[]> => {
    const allBlogs = await getAllBlogMetadata();
    const blogs = allBlogs.sort((a, b) =>
      compareDesc(new Date(a.data.publishedAt), new Date(b.data.publishedAt))
    );
    if (process.env.NODE_ENV === "development") {
      return blogs; // Show all blogs, including drafts
    }
    return blogs.filter((blog) => blog.data.isPublished); // Only published blogs in production
  },
  ['blogs'],
  { revalidate: 1800 }
);

// Get blogs by tag/category
export async function getBlogsByTag(tag: string): Promise<BlogMetadata[]> {
  const allBlogs = await getBlogs(); // Await the async getBlogs
  return allBlogs.filter((blog) =>
    blog.data.tags?.some((t) => slugify(t) === tag)
  );
}

// Get a single blog by slug
export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  const filePath = `${slug}.mdx`; // Construct the file path

  try {
    // Fetch ONLY the content for the specific file
    const rawContent = await getGitHubFileContent(filePath);

    // Use the shared compile function on the specific file's content
    const { content, frontmatter } = await compileMdxContent(rawContent);

    return {
      data: frontmatter,
      slug: slugify(frontmatter.title), // Use frontmatter for slug
      content: content,
      rawContent: rawContent, // Include raw content for headings etc.
    } as Blog;

  } catch (error) {
    // If the file is not found, return undefined
    console.error(`Error fetching blog with slug ${slug}:`, error);
    return undefined;
  }
}

// Get all unique tags from published blogs
export async function getAllTags(): Promise<string[]> {
  const allBlogsMetadata = await getBlogs(); // Await the async getBlogs
  const tags: string[] = [];
  allBlogsMetadata.forEach((blog) => {
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