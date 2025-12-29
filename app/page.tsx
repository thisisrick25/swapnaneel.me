import { getBlogs } from '@/utils/getBlogs'
import { getMergedContributions } from '@/utils/getContributions'
import { getViewsCount } from '@/db/queries'
import ContributionCalendar from '@/components/contributionCalendar'
import { getBothCalendars } from '@/utils/getContributionCalendar'
import HeroSection from '@/components/heroSection'
import EducationSection from '@/components/educationSection'
import OpenSourceSection from '@/components/openSourceSection'
import WritingSection from '@/components/writingSection'
import SkillsSection from '@/components/skillSection'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const blogs = await getBlogs()
  const contributions = await getMergedContributions()
  const allViews = await getViewsCount()
  const calendars = await getBothCalendars()

  const recentPosts = blogs.slice(0, 4)
  const recentContributions = contributions.slice(0, 4)

  return (
    <div className="py-16 sm:py-24">
      {/* Header / Profile Section */}
      <HeroSection />

      {/* Education */}
      <EducationSection />

      {/* Writing Section */}
      <WritingSection posts={recentPosts} views={allViews} />

      {/* Open Source Section */}
      <OpenSourceSection contributions={recentContributions} />

      {/* GitHub Activity Calendar */}
      <ContributionCalendar github={calendars.github} gitlab={calendars.gitlab} />

      {/* Skills */}
      <SkillsSection />
    </div>
  )
}
