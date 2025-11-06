import Link from 'next/link'
import DateDisplay from '@/components/dateDisplay'
import { inter, poppins } from '@/fonts'

type Props = {
  title: string
  repo: string
  link: string
  mergedAt?: string | null
  body?: string | null
  relatedIssues?: { number: number; url: string }[]
  source: 'github' | 'gitlab'
}

export default function ContributionItem({ title, repo, link, mergedAt, body, relatedIssues, source }: Props) {
  const excerpt = body ? body.replace(/\n+/g, ' ').slice(0, 240) : ''
  const repoUrl = source === 'github' ? `https://github.com/${repo}` : `https://gitlab.com/${repo}`

  return (
    <article className="bg-white/60 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 p-4 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className={`${poppins.className} text-base md:text-lg font-semibold leading-tight`}>
            <Link href={link} target="_blank" rel="noopener noreferrer" className="hover:underline text-slate-900 dark:text-slate-100">
              {title}
            </Link>
          </h2>
          {excerpt && (
            <p className={`${inter.className} mt-2 text-sm text-gray-700 dark:text-gray-300 truncate`}>{excerpt}{excerpt.length === 240 ? '…' : ''}</p>
          )}
        </div>

        <div className="flex-shrink-0 text-right">
          <div className="flex items-center gap-2 mb-2">
            <Link href={repoUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
              {repo}
            </Link>
            <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${source === 'github' ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-200'}`}>
              {source === 'github' ? 'GitHub' : 'GitLab'}
            </span>
          </div>

          <div className="text-xs text-neutral-500 dark:text-neutral-400 italic">
            <span className="ml-1 inline-flex gap-1">Merged <DateDisplay date={mergedAt || ''} /></span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {relatedIssues && relatedIssues.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-neutral-500 text-xs mr-1">Related:</span>
            {relatedIssues.map((issue) => (
              <Link key={issue.number} href={issue.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-medium mr-2 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 rounded-md hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                #{issue.number}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
