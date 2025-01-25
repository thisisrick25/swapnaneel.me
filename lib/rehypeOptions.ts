export const rehypeAutolinkHeadingsOptions = {
  properties: {
    className: ["anchor"],
  },
  behavior: 'prepend', 
}

export const rehypePrettyCodeOptions = {
  theme: 'one-dark-pro',
  // //@ts-ignore
  // onVisitLine(node) {
  //   // Prevent lines from collapsing in `display: grid` mode, and allow empty
  //   // lines to be copy/pasted
  //   if (node.children.length === 0) {
  //     node.children = [{ type: 'text', value: ' ' }];
  //   }
  // },
  // //@ts-ignore
  // onVisitHighlightedLine(node) {
  //   node.properties.className.push('line--highlighted');
  // },
  // //@ts-ignore
  // onVisitHighlightedWord(node) {
  //   node.properties.className = ['word--highlighted'];
  // },
}