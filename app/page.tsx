import HeroSection from '@/components/heroSection'
import EducationSection from '@/components/educationSection'
import PublicationSection from '@/components/publicationSection'
import OpenSourceSection from '@/components/openSourceSection'
import WritingSection from '@/components/writingSection'
import SkillsSection from '@/components/skillSection'
import NewsSection from '@/components/newsSection'
import ContributionGraphSection from '@/components/contributionGraphSection'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="py-16 sm:py-24">
      {/* Header / Profile Section */}
      <HeroSection />

      {/* News */}
      <NewsSection />

      {/* Education */}
      <EducationSection />

      {/* Publications */}
      <PublicationSection />

      {/* Open Source Section */}
      <OpenSourceSection />

      {/* Writing Section */}
      <WritingSection />

      {/* GitHub Activity Calendar */}
      <ContributionGraphSection />

      {/* Skills */}
      <SkillsSection />
    </div>
  )
}
