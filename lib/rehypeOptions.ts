export const rehypeAutolinkHeadingsOptions = {
  properties: {
    className: ["anchor"],
  },
  behavior: 'prepend', 
}

export const rehypePrettyCodeOptions = {
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