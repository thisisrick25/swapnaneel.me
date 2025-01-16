import { defineCollection, defineConfig } from "@content-collections/core";
// import remarkGfm from "remark-gfm";
// import rehypePrettyCode from 'rehype-pretty-code';
// import rehypeSlug from 'rehype-slug';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import githubSlugger from "github-slugger";
// import { rehypePrettyCodeOptions, rehypeAutolinkHeadingsOptions } from './lib/rehypeOptions'
// import { is } from "date-fns/locale";

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
  transform: (blog) => {
    const slugger = new githubSlugger();
    return {
      ...blog,
      slug: slugger.slug(blog.title),
    };
  },
});
 
export default defineConfig({
  collections: [Blog],
  // mdx: {
  //   esbuildOptions(options) {
  //     options.target = "esnext";
  //     return options;
  //   },
  //   remarkPlugins: [remarkGfm],
  //   rehypePlugins: [
  //     [rehypeSlug],
  //     [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
  //     [rehypePrettyCode, rehypePrettyCodeOptions],
  //   ],
  // },
});