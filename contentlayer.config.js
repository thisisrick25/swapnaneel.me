import { makeSource } from "contentlayer/source-files"
import remarkGfm from "remark-gfm";
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// import { Tag } from "./tag"
// import { Series } from "./series"
import { defineDocumentType } from "contentlayer/source-files"
import githubSlugger from "github-slugger";
import { rehypePrettyCodeOptions, rehypeAutolinkHeadingsOptions } from './lib/rehypeOptions'

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (blog) => blog._raw.flattenedPath,
    // resolve: (blog) => blog._raw.sourceFileName.replace(/\.mdx$/, "")
  },
  headings: {
    type: "json",
    resolve: async (doc) => {
      // use same package as rehypeSlug so toc and sluggified headings match https://github.com/rehypejs/rehype-slug/blob/main/package.json#L36
      const slugger = new githubSlugger();

      // https://stackoverflow.com/a/70802303
      const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;

      const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
        // @ts-ignore
        ({ groups }) => {
          const flag = groups?.flag;
          const content = groups?.content;
          return {
            // heading: flag?.length,
            heading: flag?.length == 1 ? "one" : flag?.length == 2 ? "two" : "three",
            text: content,
            slug: content ? slugger.slug(content) : undefined,
          };
        }
      );
      return headings;
    },
  },
};

const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: '**/*.mdx',
  contentType: "mdx",
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    publishedAt: {
      type: 'date',
      required: true,
    },
    updatedAt: { type: 'date', },
    image: { type: 'string', },
    isPublished: {
      type: 'boolean',
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "content/posts",
  documentTypes: [Blog],
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext";
      return options;
    },
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypeSlug],
      [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
      [rehypePrettyCode, rehypePrettyCodeOptions],
    ],
  },
});

