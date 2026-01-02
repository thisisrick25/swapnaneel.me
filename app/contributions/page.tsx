import { Metadata } from 'next'
import { getMergedContributions } from '@/utils/getContributions'
import { poppins } from '@/fonts'
import ContributionCard from '@/components/contributionCard'
import BackLink from '@/components/backLink'

export const dynamic = 'force-dynamic'

export function generateMetadata(): Metadata {
  return {
    title: 'Contributions',
    description: 'Open-source contributions and merged pull requests.',
  }
}

export default async function Page() {
  const contributions = await getMergedContributions()

  return (
    <div className="py-16 sm:py-24">
      {/* Header */}
      <section className="mb-12">
        <BackLink />
        <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-2 ${poppins.className}`}>Open Source</h1>
        <p className="text-base text-gray-600 dark:text-gray-300">
          Merged pull requests and contributions to open-source projects.
        </p>
      </section>

      {/* Contributions Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {contributions.length > 0 ? (
          contributions.map((contribution) => (
            <ContributionCard
              key={`${contribution.source}-${contribution.id}`}
              id={contribution.id}
              title={contribution.title}
              repo={contribution.repo}
              link={contribution.html_url}
              mergedAt={contribution.merged_at}
              relatedIssues={contribution.relatedIssues}
              source={contribution.source}
              showLink={true}
            />
          ))
        ) : (
          <p className="text-sm">No contributions yet.</p>
        )}
      </div>

    </div>
  )
}
