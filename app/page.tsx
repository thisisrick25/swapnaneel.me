import Image from 'next/image'
import Link from 'next/link'
import { getBlogs } from '@/utils/getBlogs'
import { getMergedContributions } from '@/utils/getContributions'
import { getViewsCount } from '@/db/queries'
import { siteMetadata } from '@/utils/siteMetadata'
import SkillsSection from '@/components/skillSection'
import Footer from '@/components/footer'
import ContributionCard from '@/components/contributionCard'
import ContributionCalendar from '@/components/contributionCalendar'
import { getBothCalendars } from '@/utils/getContributionCalendar'
import { poppins } from '@/fonts'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import { LuFileText } from 'react-icons/lu'
import PostCard from '@/components/postCard'

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
      <section className="mb-16" id="top">
        <div className="flex items-start gap-5 mb-8">
          <Image
            src="https://github.com/thisisrick25.png"
            alt="Swapnaneel Patra"
            width={88}
            height={88}
            className="profile-image"
            priority
          />
          <div>
            <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-1 ${poppins.className}`}>
              Swapnaneel Patra
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Software Engineer
            </p>
          </div>
        </div>

        <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mb-6">
          Building software and exploring machine learning.
          Interested in distributed systems, developer tools, and open source.
          Currently learning and contributing to the community.
        </p>

        {/* Social Links */}
        <div className="flex flex-wrap gap-3">
          <Link
            href={siteMetadata.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <SiGithub className="w-4 h-4" />
            GitHub
          </Link>
          <Link
            href={siteMetadata.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <SiLinkedin className="w-4 h-4" />
            LinkedIn
          </Link>
          <Link
            href={siteMetadata.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <LuFileText className="w-4 h-4" />
            Resume
          </Link>
        </div>
      </section>

      {/* Writing Section */}
      <section className="mb-16">
        <div className="section-header">
          <h2 className={poppins.className}>Writing</h2>
          <Link href="/posts" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            View all →
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => {
              const viewCount = allViews.find((v) => v.slug === post.slug)?.count || 0
              return (
                <PostCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.data.title}
                  description={post.data.description}
                  publishedAt={post.data.publishedAt}
                  viewCount={viewCount}
                  tags={post.data.tags}
                />
              )
            })
          ) : (
            <p className="text-sm">No posts yet.</p>
          )}
        </div>
      </section>

      {/* Open Source Section */}
      <section className="mb-16">
        <div className="section-header">
          <h2 className={poppins.className}>Open Source</h2>
          <Link href="/contributions" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            View all →
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {recentContributions.length > 0 ? (
            recentContributions.map((contribution) => (
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

      {/* GitHub Activity Calendar */}
      <ContributionCalendar github={calendars.github} gitlab={calendars.gitlab} />

      {/* Skills */}
      <SkillsSection />
    </div>
  )
}
