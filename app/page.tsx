import { Suspense } from 'react'
import HeroSection from '@/components/heroSection'
import EducationSection from '@/components/educationSection'
// import PublicationSection from '@/components/publicationSection'
import ContributionSection from '@/components/contributionSection'
import WritingSection from '@/components/writingSection'
import SkillsSection from '@/components/skillSection'
import NewsSection from '@/components/newsSection'
import ProjectShowcaseSection from '@/components/projectShowcaseSection'
import ContributionGraphSection from '@/components/contributionGraphSection'
import { SectionSkeleton, ContributionSkeleton } from '@/components/skeletons'
import FadeIn from '@/components/fadeIn'

export default function Home() {
  return (
    <div className="py-16 sm:py-24">
      {/* Header / Profile Section */}
      <FadeIn>
        <HeroSection />
      </FadeIn>

      {/* News */}
      <FadeIn delay={0.1}>
        <Suspense fallback={<SectionSkeleton />}>
          <NewsSection />
        </Suspense>
      </FadeIn>

      {/* Education */}
      <FadeIn delay={0.2}>
        <EducationSection />
      </FadeIn>

      {/* Publications */}
      <Suspense fallback={<SectionSkeleton />}>
        {/* <PublicationSection /> */}
      </Suspense>

      {/* Projects */}
      <FadeIn>
        <Suspense fallback={<SectionSkeleton />}>
          <ProjectShowcaseSection />
        </Suspense>
      </FadeIn>

      {/* Writing Section */}
      <FadeIn>
        <Suspense fallback={<SectionSkeleton />}>
          <WritingSection />
        </Suspense>
      </FadeIn>

      {/* Open Source Section */}
      <FadeIn>
        <Suspense fallback={<SectionSkeleton />}>
          <ContributionSection />
        </Suspense>
      </FadeIn>

      {/* GitHub Activity Calendar */}
      <FadeIn>
        <Suspense fallback={<ContributionSkeleton />}>
          <ContributionGraphSection />
        </Suspense>
      </FadeIn>

      {/* Skills */}
      <FadeIn>
        <SkillsSection />
      </FadeIn>
    </div>
  )
}
