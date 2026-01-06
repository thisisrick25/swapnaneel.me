import { notFound } from 'next/navigation';
import { Metadata } from 'next'
import { cache } from 'react';
import { poppins, inter, ibm_plex_mono } from '@/fonts';
import DateDisplay from '@/components/dateDisplay';
import BackLink from '@/components/backLink';
import { GIT_USERNAME } from '@/lib/constants';
import { getContributionBySlug, ContributionBlog, getMergedContributions } from '@/utils/getContributions';
import { LuExternalLink, LuGitMerge } from 'react-icons/lu';
import { SiGithub, SiGitlab } from 'react-icons/si';

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
    // Match contributionCard.tsx: owner-repo-id (lowercase, no dots/slashes)
    const safeRepo = contribution.repo.replace(/[\/\.]/g, "-").toLowerCase();
    const slug = `${safeRepo}-${contribution.id}`;
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
  const repoUrl = source === 'github'
    ? `https://github.com/${contribution.data.repo}`
    : `https://gitlab.com/${contribution.data.repo}`;
  const sourceUrl = source === 'github'
    ? `https://github.com/${GIT_USERNAME}`
    : `https://gitlab.com/${GIT_USERNAME}`;
  const SourceIcon = source === 'github' ? SiGithub : SiGitlab;
  const sourceColor = source === 'github'
    ? 'text-gray-600 dark:text-gray-400'
    : 'text-orange-600 dark:text-orange-400';

  const extractIssueNumber = (url: string): string => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  return (
    <article className="py-16 sm:py-24 px-4">
      {/* Back links */}
      <div className="flex flex-col gap-1 mb-8">
        <BackLink href="/contributions" text="Back to contributions" className="" />
        <BackLink href="/" text="Back to home" className="" />
      </div>

      {/* Header - matching ContributionCard layout */}
      <header className="mb-8">
        {/* Top metadata: repo + source icon + external link */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-1.5 py-1 text-xs font-medium border border-gray-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 transition-all hover:shadow-[0_0_4px_rgba(59,130,246,0.3)] dark:hover:shadow-[0_0_4px_rgba(147,197,253,0.3)] ${ibm_plex_mono.className}`}
            >
              {contribution.data.repo}
            </a>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${sourceColor} hover:opacity-70 transition-opacity`}
              title={source === 'github' ? 'GitHub' : 'GitLab'}
            >
              <SourceIcon className="w-4 h-4" />
            </a>
          </div>
          <a
            href={contribution.data.url}
            target="_blank"
            rel="noopener noreferrer"
            title="View PR on GitHub/GitLab"
            className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <LuExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Title - with view transition name */}
        <h1
          className={`text-2xl sm:text-3xl font-bold tracking-tight mb-3 ${poppins.className}`}
          style={{ viewTransitionName: `contribution-title-${slug}` }}
        >
          {contribution.data.title}
        </h1>

        {/* Merged status + Fixes */}
        <div className="flex items-center gap-2 text-sm mb-3">
          <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
            <LuGitMerge className="w-4 h-4" />
            Merged
          </span>
          {contribution.data.relatedIssues && contribution.data.relatedIssues.length > 0 && (
            <>
              <span className="text-gray-500 dark:text-gray-400">·</span>
              <span className="text-gray-500 dark:text-gray-400">
                Fixes: {contribution.data.relatedIssues.filter(Boolean).map((issueUrl, idx) => (
                  <span key={issueUrl}>
                    {idx > 0 && ', '}
                    <a
                      href={issueUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      #{extractIssueNumber(issueUrl)}
                    </a>
                  </span>
                ))}
              </span>
            </>
          )}
        </div>

        {/* Date */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <DateDisplay date={contribution.data.mergedAt || ''} />
        </div>
      </header>

      {/* Content */}
      <div className={`${poppins.variable} ${inter.variable} ${ibm_plex_mono.variable} prose dark:prose-invert prose-lg max-w-none`}>
        {contribution.summaryContent}
        {contribution.content}
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-zinc-800">
        <BackLink href="/contributions" text="Back to all contributions" className="" />
      </footer>
    </article>
  );
}
