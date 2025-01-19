import { defineCollection, defineConfig } from "@content-collections/core";
import {slug} from "github-slugger";

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
    return {
      ...blog,
      slug: slug(blog.title),
    };
  },
});
 
export default defineConfig({
  collections: [Blog],
});