"use client"

import { Link } from 'next-view-transitions'
import DateDisplay from '@/components/dateDisplay'

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

export default function ContributionCard({ title, repo, mergedAt, id, showLink = true }: Props) {
  const safeRepo = repo.replace(/[\/\.]/g, "-").toLowerCase();
  const slug = `${safeRepo}-${id}`;

  const content = (
    <>
      <span className="text-sm text-gray-400 font-mono w-28 shrink-0">
        <DateDisplay date={mergedAt || ''} />
      </span>
      <div className="flex-grow flex items-center justify-between w-full">
        <h3
          className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 group-hover:translate-x-2 transition-transform duration-300 line-clamp-2 sm:line-clamp-1"
          style={{ viewTransitionName: `contribution-title-${slug}` }}
        >
          {title}
        </h3>
        <span className="text-xs text-gray-400 dark:text-gray-500 font-mono shrink-0 ml-4 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {repo}
        </span>
      </div>
    </>
  )

  const classes = "group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 py-5 sm:py-6 border-b border-gray-100 dark:border-zinc-800/50 last:border-0 transition-all"

  if (showLink) {
    return (
      <Link href={`/contributions/${slug}`} className={classes} aria-label={`View ${title}`}>
        {content}
      </Link>
    )
  }

  return (
    <div className={classes}>
      {content}
    </div>
  )
}
