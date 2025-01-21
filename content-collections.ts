import { createDefaultImport, defineCollection, defineConfig, } from "@content-collections/core";
import { MDXContent } from "mdx/types";
import { compileMDX } from "@content-collections/mdx";

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
    // const mdxContent = createDefaultImport<MDXContent>(`@/content/posts/${_meta.filePath}`);
    const mdx = await compileMDX(blog, doc);
    return {
      // ...blog,
      // mdxContent,
      // content,
      slug: doc._meta.path,
      ...doc,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [Blog],
});