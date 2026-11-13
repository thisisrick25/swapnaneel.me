import { Suspense } from 'react'
import HeroSection from '@/components/heroSection'
import NewsSection from '@/components/newsSection'
import ProjectSection from '@/components/projectSection'
import EducationSection from '@/components/educationSection'
import PublicationSection from '@/components/publicationSection'
import WritingSection from '@/components/writingSection'
import ContributionSection from '@/components/contributionSection'
import ContributionGraphSection from '@/components/contributionGraphSection'
import SkillsSection from '@/components/skillSection'
import { ProjectSkeleton, WritingSkeleton, ContributionSkeleton, ContributionGraphSkeleton } from '@/components/skeletons'

export default function Home() {
  return (
    <div className="py-16 sm:py-24">
      {/* Static sections — render directly */}
      <HeroSection />
      <NewsSection />

      {/* Async sections — Suspense boundaries for independent streaming */}
      <Suspense fallback={<ProjectSkeleton />}>
        <ProjectSection />
      </Suspense>

      <EducationSection />
      <PublicationSection />

      <Suspense fallback={<WritingSkeleton />}>
        <WritingSection />
      </Suspense>

      <Suspense fallback={<ContributionSkeleton />}>
        <ContributionSection />
      </Suspense>

      <Suspense fallback={<ContributionGraphSkeleton />}>
        <ContributionGraphSection />
      </Suspense>

      <SkillsSection />
    </div>
  )
}
