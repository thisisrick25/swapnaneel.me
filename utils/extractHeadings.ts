type Heading = {
  text: string;
  level: number;
  slug: string;
};

export function extractHeadings(markdown: string): Heading[] {
  // Match all headings (## or ### format)
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;  // number of # symbols
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    headings.push({ text, level, slug });
  }
  
  return headings;
} 