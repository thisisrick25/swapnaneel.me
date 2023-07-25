import { defineDocumentType, defineComputedFields } from 'contentlayer/source-files'
import githubSlugger from 'github-slugger'

import { Tag } from "./tag"
import { Series } from "./series"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = defineComputedFields<"Blog">({
  slug: {
    type: "string",
    resolve: (blog) => blog._raw.sourceFileName.replace(/\.mdx$/, ""),
  },
  headings: {
    type: "json",
    resolve: async (doc) => {
      // use same package as rehypeSlug so toc and sluggified headings match https://github.com/rehypejs/rehype-slug/blob/main/package.json#L36
      const slugger = new githubSlugger();

      // https://stackoverflow.com/a/70802303
      const regXHeader = /\n\n(?<flag>#{1,6})\s+(?<content>.+)/g;

      const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
        // @ts-ignore
        ({ groups }) => {
          const flag = groups?.flag;
          const content = groups?.content;
          return {
            heading: flag?.length,
            text: content,
            slug: content ? slugger.slug(content) : undefined,
          };
        }
      );
      return headings;
    },
  },
});

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `posts/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: 'string', required: true, },
    description: { type: 'string', required: true, },
    publishedAt: { type: 'string', required: true, },
    lastEditedAt: { type: 'string', },
    // image: { type: 'string', },
    status: {
      type: "enum",
      options: ["draft", "published"],
      required: true,
    },
    tags: {
      type: "list",
      of: Tag,
    },
    series: {
      type: "nested",
      of: Series,
    },
  },
  computedFields
}))