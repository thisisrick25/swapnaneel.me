"use client"

import { Link } from 'next-view-transitions'
import DateDisplay from '@/components/dateDisplay'
import ShinyCard from '@/components/shinyCard'
import { GIT_USERNAME } from '@/lib/constants'
import { LuExternalLink, LuGitMerge } from 'react-icons/lu'
import { SiGithub, SiGitlab } from 'react-icons/si'
import { ibm_plex_mono } from '@/fonts'

type Props = {
  id: number
  title: string
  repo: string
  link: string
  mergedAt?: string | null
  relatedIssues?: string[]
  source: 'github' | 'gitlab'
  showLink?: boolean
}

export default function ContributionCard({ title, repo, link, mergedAt, relatedIssues, source, id, showLink = true }: Props) {
  const repoUrl = source === 'github' ? `https://github.com/${repo}` : `https://gitlab.com/${repo}`
  const sourceUrl = source === 'github' ? `https://github.com/${GIT_USERNAME}` : `https://gitlab.com/${GIT_USERNAME}`

  const repoSlug = repo?.replace("/", "-") || "unknown";
  const dateStr = mergedAt ? mergedAt.slice(0, 10).replace(/-/g, "") : "00000000";
  const slug = `${dateStr}-${repoSlug}-${id}`;

  const extractIssueNumber = (url: string): string => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const SourceIcon = source === 'github' ? SiGithub : SiGitlab
  const sourceColor = source === 'github'
    ? 'text-gray-600 dark:text-gray-400'
    : 'text-orange-600 dark:text-orange-400'

  return (
    <ShinyCard
      containerClassName="group h-full rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600 hover:shadow-lg dark:hover:shadow-gray-500/10 transition-all"
      className="h-full flex flex-col p-3 bg-gray-50/50 dark:bg-zinc-800/50 rounded-xl"
    >
      {/* Header: repo tag + source icon + arrow */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-1.5 py-0.5 text-[8px] font-medium border border-gray-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 transition-all hover:shadow-[0_0_4px_rgba(59,130,246,0.3)] dark:hover:shadow-[0_0_4px_rgba(147,197,253,0.3)] ${ibm_plex_mono.className}`}
          >
            {repo}
          </a>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${sourceColor} hover:opacity-70 transition-opacity`}
            title={source === 'github' ? 'GitHub' : 'GitLab'}
          >
            <SourceIcon className="w-3.5 h-3.5" />
          </a>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title="View PR on github/gitlab"
          className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
        >
          <LuExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Title - reserves 2 lines of space, links to writeup */}
      {showLink ? (
        <Link
          href={`/contributions/${slug}`}
          className="text-sm font-semibold min-h-10 mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block"
          style={{ viewTransitionName: `contribution-title-${slug}` }}
        >
          {title}
        </Link>
      ) : (
        <h1
          className="text-sm font-semibold mb-3 block"
          style={{ viewTransitionName: `contribution-title-${slug}` }}
        >
          {title}
        </h1>
      )}

      {/* Merged status + Fixes on same line */}
      <div className="flex items-center gap-1.5 text-[10px]">
        <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
          <LuGitMerge className="w-2.5 h-2.5" />
          Merged
        </span>
        {relatedIssues && relatedIssues.length > 0 && (
          <>
            <span className="text-gray-500 dark:text-gray-400">·</span>
            <span className="text-gray-500 dark:text-gray-400">
              Fixes: {relatedIssues.filter(Boolean).map((issueUrl, idx) => (
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

      {/* Date on its own line */}
      <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-auto pt-1.5">
        <DateDisplay date={mergedAt || ''} />
      </div>
    </ShinyCard>
  )
}
