import { Metadata } from 'next'
import { getExternalMergedContributions } from '@/utils/getContributions'
import ContributionItem from '@/components/contributionItem'

export const dynamic = 'force-dynamic'

export function generateMetadata(): Metadata {
  return {
    title: 'Contributions',
    description: 'Open-source PRs and issues I have worked on',
  }
}

export default async function Page() {
  const externalMerged = await getExternalMergedContributions()

  return (
    <div>
      <h1 className="text-lg font-bold mb-6">Contributions</h1>
      <div>
        {externalMerged.map((c) => (
          <ContributionItem
            key={`ext-${c.id}`}
            title={c.title}
            repo={c.repo}
            link={c.html_url}
            type={c.type}
            mergedAt={c.merged_at}
            body={c.body}
            relatedIssues={c.relatedIssues}
          />
        ))}
      </div>
    </div>
  )
}
