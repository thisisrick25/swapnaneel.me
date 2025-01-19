import { withContentCollections } from "@content-collections/next";
import createMDX from "@next/mdx";
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
// import remarkGfm from "remark-gfm";
// import rehypePrettyCode from 'rehype-pretty-code';
// import rehypeSlug from 'rehype-slug';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// import { rehypePrettyCodeOptions, rehypeAutolinkHeadingsOptions } from './lib/rehypeOptions'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter,remarkMdxFrontmatter],
    // remarkPlugins: [remarkGfm],
    // rehypePlugins: [[rehypeSlug],
    //   [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
    //   [rehypePrettyCode, rehypePrettyCodeOptions]],
  },
});


// withContentCollections must be the outermost plugin
export default withContentCollections(withMDX(nextConfig));
