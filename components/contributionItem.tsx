import Link from 'next/link'
import DateDisplay from '@/components/dateDisplay'
import { poppins, inter, jetbrains_mono } from '@/fonts'
import { GIT_USERNAME } from '@/lib/constants'

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

export default function ContributionItem({ title, repo, link, mergedAt, relatedIssues, source, id, showLink = true }: Props) {
  const repoUrl = source === 'github' ? `https://github.com/${repo}` : `https://gitlab.com/${repo}`

  const repoSlug = repo?.replace("/", "-") || "unknown";
  const dateStr = mergedAt ? mergedAt.slice(0, 10).replace(/-/g, "") : "00000000";
  const slug = `${dateStr}-${repoSlug}-${id}`;

  const extractIssueNumber = (url: string): string => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const repoAndSource = (
    <div className={`${inter.className} flex-shrink-0 text-xs font-medium`}>
      <div className="flex justify-end gap-1">
        <Link href={repoUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-2 py-1 rounded-full bg-stone-300 dark:bg-stone-800 hover:bg-stone-400 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors">
          {repo}
        </Link>
        <Link href={source === 'github' ? `https://github.com/${GIT_USERNAME}` : `https://gitlab.com/${GIT_USERNAME}`} target="_blank" rel="noopener noreferrer" className={`inline-block px-2 py-1 rounded-full ${source === 'github' ? 'bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200' : 'bg-orange-300 dark:bg-orange-800/30 hover:bg-orange-400 dark:hover:bg-orange-700 text-orange-700 dark:text-orange-200'} transition-colors`}>
          {source === 'github' ? 'GitHub' : 'GitLab'}
        </Link>
      </div>
    </div>
  )

  const relatedIssuesAndMergedAt = (
    <div className="flex justify-between text-xs md:text-sm text-gray-600 dark:text-gray-400">
      <div className="flex items-center">
        <span className={`${inter.className} inline-flex gap-1`} style={{ fontWeight: '300' }}>Merged <DateDisplay date={mergedAt || ''} /></span>
      </div>
      {relatedIssues && relatedIssues.length > 0 && (
        <span className={`${jetbrains_mono.className} flex items-center gap-1`} style={{ fontWeight: '300' }}>Related
          {relatedIssues?.filter(i => i).map((issueUrl) => (
            <Link key={issueUrl} href={issueUrl} target="_blank" rel="noopener noreferrer" className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-700 text-blue-700 dark:text-blue-200 rounded-md transition-colors">
              #{extractIssueNumber(issueUrl)}
            </Link>
          ))}
        </span>
      )}
    </div>
  )

  if (showLink) {
    return (
      <div className="bg-neutral-100/60 dark:bg-neutral-900/60 p-3 rounded-lg my-4 shadow-xs">
        <div className="flex justify-between gap-2 mb-2">
          <Link href={`/contributions/${slug}`} className={`${poppins.className}`} style={{ fontWeight: '500' }}>
            {title}
          </Link>
          {repoAndSource}
        </div>
        {relatedIssuesAndMergedAt}
      </div>
    );
  }

  return (
    <div className="bg-neutral-100/60 dark:bg-neutral-900/60 p-3 rounded-lg mb-4 shadow-xs">
      <div className="flex justify-between gap-2 mb-2">
        {link ? (
          <Link href={link} target="_blank" rel="noopener noreferrer" className={`${poppins.className}`} style={{ fontWeight: '500' }}>
            {title}
          </Link>
        ) : (
          <span>{title}</span>
        )}
        {repoAndSource}
      </div>
      {relatedIssuesAndMergedAt}
    </div>
  );
}
