import { createDefaultImport, defineCollection, defineConfig, } from "@content-collections/core";
import { MDXContent } from "mdx/types";
import { compileMDX } from "@content-collections/mdx";
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from "rehype-pretty-code";
import { rehypeAutolinkHeadingsOptions, rehypePrettyCodeOptions } from '@/lib/rehypeOptions'

const Blog = defineCollection({
  name: "Blog",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    publishedAt: z.string().transform((str) => new Date(str)),
    updatedAt: z.date().optional(),  // Make optional if not all posts have it
    isPublished: z.boolean(),
    tags: z.array(z.string()),
  }),
  transform: async (doc, blog) => {
    // Define remark and rehype plugins in separate variables for better organization
    const remarkPluginsOptions: any[] = [remarkGfm]; // Add remark plugins here if needed
    const rehypePluginsOptions: any[] = [[rehypeSlug],
    [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
    [rehypePrettyCode, rehypePrettyCodeOptions]]; // Add rehype plugins here if needed
    // rehype-autolink-headings only work for headings with an id attribute. Since in markdown they don't have an id by default, you need to use the rehype-slug plugin too to get it to work.

    // Encapsulate options in a single variable
    const options = {
      remarkPlugins: remarkPluginsOptions,
      rehypePlugins: rehypePluginsOptions,
    };
    const mdx = await compileMDX(blog, doc, options);
    return {
      // ...blog,
      // mdxContent,
      // content,
      slug: doc._meta.path,
      ...doc,
      mdx,
    };
    // transform: ({_meta, ...blog}) => {
    //   const mdxContent = createDefaultImport<MDXContent>(`@/content/posts/${_meta.filePath}`);
    //   return {
    //     ...blog,
    //     slug: _meta.path,
    //     mdxContent,
    //   };
  },
});

export default defineConfig({
  collections: [Blog],
});