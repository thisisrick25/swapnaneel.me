import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'

const rehypeAutolinkHeadingsOptions = {
  properties: {
    className: ["anchor"],
  },
  behavior: 'prepend',
}

const rehypePrettyCodeOptions = {
  theme: 'one-dark-pro',
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className.push('line--highlighted');
  },
  onVisitHighlightedWord(node: any) {
    node.properties.className = ['word--highlighted'];
  },
}

export {
  remarkFrontmatter,
  remarkMdxFrontmatter,
  rehypeSlug,
  rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions,
  rehypePrettyCode, rehypePrettyCodeOptions,
  remarkGfm,
}