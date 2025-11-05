import Link from 'next/link'
import DateDisplay from '@/components/dateDisplay'
import { inter, poppins } from '@/fonts'

type Props = {
  title: string
  repo: string
  link: string
  type: 'pr' | 'issue'
  mergedAt?: string | null
  body?: string | null
  relatedIssues?: { number: number; url: string }[]
}

export default function ContributionItem({ title, repo, link, type, mergedAt, body, relatedIssues }: Props) {
  const excerpt = body ? body.replace(/\n+/g, ' ').slice(0, 240) : ''

  return (
    <article className="border p-4 rounded mb-4">
      <h2 className={`${poppins.className} text-lg font-semibold`}>
        <Link href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {title}
        </Link>
      </h2>
      <div className={`${inter.className} text-xs text-gray-600 dark:text-gray-400 flex items-center gap-3 mt-2`}>
        <Link href={`https://github.com/${repo}`} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
          {repo}
        </Link>
        <span className="text-neutral-500">{type.toUpperCase()}</span>
        <span className="text-neutral-400">•</span>
        {/* Show only merged date for PRs */}
        <span className='inline-flex gap-1 italic'>Merged <DateDisplay date={mergedAt || ''} /></span>
      </div>
      {relatedIssues && relatedIssues.length > 0 && (
        <div className="mt-2 text-xs">
          <span className="text-neutral-500 mr-2">Related:</span>
          {relatedIssues.map((issue) => (
            <Link key={issue.number} href={issue.url} target="_blank" rel="noopener noreferrer" className="mr-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
              #{issue.number}
            </Link>
          ))}
        </div>
      )}
      {excerpt && (
        <p className={`${inter.className} mt-3 text-sm text-gray-700 dark:text-gray-300`}>{excerpt}{excerpt.length === 240 ? '…' : ''}</p>
      )}
    </article>
  )
}
