import { makeSource } from "contentlayer/source-files"

import { Blog } from './content/definitions/blog'

export default makeSource({
  contentDirPath: "content/posts",
  documentTypes: [Blog],
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext";
      return options;
    },
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

