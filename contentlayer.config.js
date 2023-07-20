import { makeSource } from "contentlayer/source-files";

export default makeSource({
  contentDirPath: "content",
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

