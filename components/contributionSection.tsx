import Link from "next/link"
import ContributionCard from "@/components/contributionCard"
import { poppins } from "@/fonts"
import { getMergedContributions } from "@/utils/getContributions"

export default async function ContributionSection() {
  const allContributions = await getMergedContributions()
  const contributions = allContributions.slice(0, 6)

  return (
    <section className="mb-12">
      <div className="section-header">
        <h2 className={poppins.className}>Open Source Contributions</h2>
        <Link
          href="/contributions"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
    </section>
  )
}
