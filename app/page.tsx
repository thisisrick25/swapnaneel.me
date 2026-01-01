import { Suspense } from 'react'
import HeroSection from '@/components/heroSection'
import EducationSection from '@/components/educationSection'
import PublicationSection from '@/components/publicationSection'
import OpenSourceSection from '@/components/openSourceSection'
import WritingSection from '@/components/writingSection'
import SkillsSection from '@/components/skillSection'
import NewsSection from '@/components/newsSection'
import ProjectShowcaseSection from '@/components/projectShowcaseSection'
import ContributionGraphSection from '@/components/contributionGraphSection'
import { SectionSkeleton, ContributionSkeleton } from '@/components/skeletons'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="py-16 sm:py-24">
      {/* Header / Profile Section */}
      <HeroSection />

      {/* News */}
      <Suspense fallback={<SectionSkeleton />}>
        <NewsSection />
      </Suspense>

      {/* Projects */}
      <Suspense fallback={<SectionSkeleton />}>
        <ProjectShowcaseSection />
      </Suspense>

      {/* Education */}
      <EducationSection />

      {/* Publications */}
      <Suspense fallback={<SectionSkeleton />}>
        {/* <PublicationSection /> */}
      </Suspense>

      {/* Open Source Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <OpenSourceSection />
      </Suspense>

      {/* GitHub Activity Calendar */}
      <Suspense fallback={<ContributionSkeleton />}>
        <ContributionGraphSection />
      </Suspense>

      {/* Writing Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <WritingSection />
      </Suspense>

      {/* Skills */}
      <SkillsSection />
    </div>
  )
}
