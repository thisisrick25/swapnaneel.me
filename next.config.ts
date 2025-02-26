import createMDX from "@next/mdx";
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
}

const withMDX = createMDX({
  options: {
    // remarkPlugins: [remarkFrontmatter,remarkMdxFrontmatter],
    rehypePlugins: [],
  },
});


export default withMDX(nextConfig);
