import Link from 'next/link'
import DateDisplay from '@/components/dateDisplay'
import { poppins } from '@/fonts'
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

  const repoSlug = repo.replace("/", "-");
  const dateStr = mergedAt ? mergedAt.slice(0, 10).replace(/-/g, "") : "00000000";
  const slug = `${dateStr}-${repoSlug}-${id}`;

  const extractIssueNumber = (url: string): string => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  return (
    <article className="bg-white/60 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 p-4 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {showLink ? (
            <h2 className={`${poppins.className} text-base md:text-lg font-semibold leading-tight`}>
              <Link href={`/contributions/${slug}`} className="hover:underline text-slate-900 dark:text-slate-100">
                {title}
              </Link>
            </h2>
          ) : (
            <h2 className={`${poppins.className} text-base md:text-lg font-semibold leading-tight text-slate-900 dark:text-slate-100`}>
              <Link href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {title}
              </Link>
            </h2>
          )}
        </div>

        <div className="flex-shrink-0 text-xs font-medium">
          <div className="flex justify-end gap-1 mb-2">
            <Link href={repoUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
              {repo}
            </Link>
            <Link href={source === 'github' ? `https://github.com/${GIT_USERNAME}` : `https://gitlab.com/${GIT_USERNAME}`} target="_blank" rel="noopener noreferrer" className={`inline-block px-2 py-1 rounded-full ${source === 'github' ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-200 hover:bg-orange-200 dark:hover:bg-orange-800'} transition-colors`}>
              {source === 'github' ? 'GitHub' : 'GitLab'}
            </Link>
          </div>

          <div className="text-xs text-neutral-500 dark:text-neutral-400 italic flex justify-end">
            <span className="ml-1 inline-flex gap-1">Merged <DateDisplay date={mergedAt || ''} /></span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {relatedIssues && relatedIssues.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-neutral-500 text-xs mr-1">Related:</span>
            {relatedIssues?.filter(i => i).map((issueUrl) => (
              <Link key={issueUrl} href={issueUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-medium mr-2 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 rounded-md hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                #{extractIssueNumber(issueUrl)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
