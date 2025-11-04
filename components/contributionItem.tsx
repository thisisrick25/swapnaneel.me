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
  labels?: string[]
}

export default function ContributionItem({ title, repo, link, type, mergedAt, body, labels }: Props) {
  const excerpt = body ? body.replace(/\n+/g, ' ').slice(0, 240) : ''

  return (
    <article className="border p-4 rounded mb-4">
      <h2 className={`${poppins.className} text-lg font-semibold`}>
        <Link href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {title}
        </Link>
      </h2>
      <div className={`${inter.className} text-xs text-gray-600 dark:text-gray-400 flex items-center gap-3 mt-2`}>
        <span className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800">{repo}</span>
        <span className="text-neutral-500">{type.toUpperCase()}</span>
        <span className="text-neutral-400">•</span>
        {/* Show only merged date for PRs */}
        {type === 'pr' ? (
          <span>Merged <DateDisplay date={mergedAt || ''} /></span>
        ) : (
          <span>—</span>
        )}
      </div>
      {labels && labels.length > 0 && (
        <div className="mt-2 text-xs">
          {labels.map((l, i) => (
            <span key={l + i} className="mr-2 px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-xs">{l}</span>
          ))}
        </div>
      )}
      {excerpt && (
        <p className={`${inter.className} mt-3 text-sm text-gray-700 dark:text-gray-300`}>{excerpt}{excerpt.length === 240 ? '…' : ''}</p>
      )}
    </article>
  )
}
