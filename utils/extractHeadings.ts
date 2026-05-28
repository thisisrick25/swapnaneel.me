import GithubSlugger from 'github-slugger';

type Heading = {
  text: string;
  level: number;
  slug: string;
};

export function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;  // number of # symbols
    const text = match[2].trim();
    const slug = slugger.slug(text);

    headings.push({ text, level, slug });
  }
  
  return headings;
} 