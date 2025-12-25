import { notFound } from 'next/navigation';
import { Metadata } from 'next'
import { cache } from 'react';
import { poppins, inter, ibm_plex_mono } from '@/fonts';
import ContributionItem from '@/components/contributionItem'
import { getContributionBySlug, ContributionBlog, getMergedContributions } from '@/utils/getContributions';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Cache the function that fetches and processes a single contribution (per-request cache)
const getContributionData = cache(async (slug: string): Promise<ContributionBlog | undefined> => {
  const contribution = await getContributionBySlug(slug);
  return contribution;
});

export async function generateStaticParams() {
  const contributions = await getMergedContributions();
  return contributions.map((contribution) => {
    const repoSlug = contribution.repo.replace("/", "-");
    const dateStr = contribution.merged_at ? contribution.merged_at.slice(0, 10).replace(/-/g, "") : "00000000";
    const slug = `${dateStr}-${repoSlug}-${contribution.id}`;
    return { slug };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const contribution = await getContributionData(slug);
  if (!contribution) notFound();

  return {
    title: contribution.data.title,
    description: contribution.data.summary,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const contribution = await getContributionData(slug);
  if (!contribution) notFound();

  const source = contribution.data.url?.includes('github.com') ? 'github' : 'gitlab';

  return (
    <div>
      <ContributionItem
        id={contribution.data.id}
        title={contribution.data.title}
        repo={contribution.data.repo}
        link={contribution.data.url}
        mergedAt={contribution.data.mergedAt}
        relatedIssues={contribution.data.relatedIssues}
        source={source}
        showLink={false}
      />
      <div className={`${poppins.variable} ${inter.variable} ${ibm_plex_mono.variable} max-w-max prose dark:prose-invert`}>
        {contribution.summaryContent}
        {contribution.content}
      </div>
    </div>
  );
}