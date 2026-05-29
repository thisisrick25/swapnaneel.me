"use client"

import { Link } from 'next-view-transitions'
import DateDisplay from '@/components/dateDisplay'
import { GIT_USERNAME } from '@/lib/constants'
import { fira_code } from '@/fonts'

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

  // Generate slug matching generate-summaries.js: owner-repo-id (lowercase, no dots/slashes)
  const safeRepo = repo.replace(/[\/\.]/g, "-").toLowerCase();
  const slug = `${safeRepo}-${id}`;

  const extractIssueNumber = (url: string): string => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  return (
    <div className="group relative overflow-hidden h-full flex flex-col p-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/50 hover:border-gray-300 dark:hover:border-zinc-600 hover:shadow-lg dark:hover:shadow-gray-500/10 transition-colors transition-shadow">
      {/* SECTION 1: TITLE */}
      <div>
        {showLink ? (
          <Link
            href={`/contributions/${slug}`}
            className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors line-clamp-3 block"
            style={{ viewTransitionName: `contribution-title-${slug}` }}
          >
            {title}
          </Link>
        ) : (
          <h1
            className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100 line-clamp-3"
            style={{ viewTransitionName: `contribution-title-${slug}` }}
          >
            {title}
          </h1>
        )}
      </div>

      {/* SECTION 2: EVERYTHING ELSE */}
      <div className="mt-auto flex flex-col gap-1.5 pt-2">
        {/* Repo Name */}
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-mono"
        >
          {repo}
        </a>

        {/* PR Info & Fixes */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-mono">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            #{id}
          </a>
          {relatedIssues && relatedIssues.length > 0 && (
            <>
              <span>·</span>
              <span className="flex gap-1">
                fixes {relatedIssues.filter(Boolean).map((issueUrl, idx) => (
                  <a
                    key={issueUrl}
                    href={issueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    #{extractIssueNumber(issueUrl)}{idx < relatedIssues.length - 1 ? ',' : ''}
                  </a>
                ))}
              </span>
            </>
          )}
        </div>

        {/* Date */}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <DateDisplay date={mergedAt || ''} />
        </div>
      </div>
    </div>
  )
}
