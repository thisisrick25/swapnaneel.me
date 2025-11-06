import { Metadata } from 'next'
import { getMergedContributions } from '@/utils/getContributions'
import ContributionItem from '@/components/contributionItem'

export const dynamic = 'force-dynamic'

export function generateMetadata(): Metadata {
  return {
    title: 'Contributions',
    description: 'Open-source PRs and issues I have worked on',
  }
}

export default async function Page() {
  const pr = await getMergedContributions()

  return (
    <div>
      <h1 className="text-lg font-bold mb-6">Contributions</h1>
      <div>
        {pr.map((c) => (
          <ContributionItem
            key={`ext-${c.source}-${c.id}`}
            title={c.title}
            repo={c.repo}
            link={c.html_url}
            mergedAt={c.merged_at}
            relatedIssues={c.relatedIssues}
            source={c.source}
            id={c.id}
          />
        ))}
      </div>
    </div>
  )
}
