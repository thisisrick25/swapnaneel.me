import { makeSource } from "contentlayer/source-files"
import remarkGfm from "remark-gfm";
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// esbuild doesn't support module aliases 
// https://github.com/contentlayerdev/contentlayer/issues/238
import { Blog } from './content/definitions/blog'

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Blog],
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext";
      return options;
    },
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypeSlug],
    [
      rehypeAutolinkHeadings,
      {
        properties: {
          className: ["anchor"],
        },
      },
    ],
    [
      rehypePrettyCode,
      {
        theme: 'one-dark-pro',
        onVisitLine(node) {
          // Prevent lines from collapsing in `display: grid` mode, and allow empty
          // lines to be copy/pasted
          if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }];
          }
        },
        onVisitHighlightedLine(node) {
          node.properties.className.push('line--highlighted');
        },
        onVisitHighlightedWord(node) {
          node.properties.className = ['word--highlighted'];
        },
      },
    ],
    ],
  },
});

