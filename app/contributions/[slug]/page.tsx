import { notFound } from 'next/navigation';
import { compileMDX } from "next-mdx-remote/rsc";
import matter from 'gray-matter';
import {
  remarkFrontmatter,
  remarkMdxFrontmatter,
  rehypeSlug,
  rehypeAutolinkHeadings,
  rehypePrettyCode,
  remarkGfm,
} from '@/lib/mdx';
import { poppins, inter, jetbrains_mono } from '@/fonts';
import { cache } from "react";
import { getGitHubFileContent } from '@/lib/github';

interface ContributionData {
  title: string;
  repo: string;
  link: string;
  mergedAt: string;
  source: string;
  type: string;
  id: number;
}

interface Contribution {
  data: ContributionData;
  slug: string;
  content: React.ReactElement;
  rawContent: string;
}

const getContributionBySlug = cache(async (slug: string): Promise<Contribution | undefined> => {
  try {
    const filePath = `contributions/${slug}.mdx`;
    const rawContent = await getGitHubFileContent(filePath);
    const { data, content } = matter(rawContent);

    const mdxContent = await compileMDX({
      source: content,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' } as any],
            [rehypePrettyCode, { theme: 'github-dark' } as any],
          ],
        },
      },
    });

    return {
      data: data as ContributionData,
      slug,
      content: mdxContent.content,
      rawContent: content,
    };
  } catch (error) {
    console.error('Error reading contribution:', error);
    return undefined;
  }
});

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const contribution = await getContributionBySlug(slug);
  if (!contribution) notFound();

  return {
    title: contribution.data.title,
    description: `Contribution: ${contribution.data.title}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const contribution = await getContributionBySlug(slug);
  if (!contribution) notFound();

  return (
    <div>
      <h1 className={`${poppins.className} text-2xl font-bold mb-4`}>
        {contribution.data.title}
      </h1>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        <p>Repository: {contribution.data.repo}</p>
        <p>Source: {contribution.data.source}</p>
        <p>Merged: {contribution.data.mergedAt}</p>
        {contribution.data.link && (
          <p>
            <a href={contribution.data.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              View on {contribution.data.source === 'github' ? 'GitHub' : 'GitLab'}
            </a>
          </p>
        )}
      </div>
      <div className={`${poppins.variable} ${inter.variable} ${jetbrains_mono.variable} max-w-max prose dark:prose-invert`}>
        {contribution.content}
      </div>
    </div>
  );
}