import ViewAllLink from "@/components/viewAllLink"
import ContributionCard from "@/components/contributionCard"
import { poppins } from "@/fonts"
import { getMergedContributions } from "@/utils/getContributions"
import { StaggerContainer, StaggerItem } from "@/components/stagger"

export default async function ContributionSection() {
  const allContributions = await getMergedContributions()
  const contributions = allContributions.slice(0, 6)

  return (
    <section className="mb-12">
      <div className="section-header">
        <h2 className={poppins.className}>Open Source Contributions</h2>
        <ViewAllLink href="/contributions" />
      </div>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {contributions.length > 0 ? (
          contributions.map((contribution) => (
            <StaggerItem key={`${contribution.source}-${contribution.id}`}>
              <ContributionCard
                id={contribution.id}
                title={contribution.title}
                repo={contribution.repo}
                link={contribution.html_url}
                mergedAt={contribution.merged_at}
                relatedIssues={contribution.relatedIssues}
                source={contribution.source}
                showLink={true}
              />
            </StaggerItem>
          ))
        ) : (
          <p className="text-sm">No contributions yet.</p>
        )}
      </StaggerContainer>
    </section>
  )
}
