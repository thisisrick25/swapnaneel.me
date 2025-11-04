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
      <section>
        <h2 className="text-base font-semibold mb-3">Notable external merged PRs</h2>
        {externalMerged.length === 0 ? (
          <p className="text-sm text-neutral-500">No external merged PRs found.</p>
        ) : (
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
                labels={c.labels}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
