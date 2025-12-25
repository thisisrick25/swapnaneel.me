import Image from 'next/image'
import Link from 'next/link'
import { getBlogs } from '@/utils/getBlogs'
import { getMergedContributions } from '@/utils/getContributions'
import { getViewsCount } from '@/db/queries'
import { siteMetadata } from '@/utils/siteMetadata'
import SkillsSection from '@/components/skillsSection'
import Footer from '@/components/footer'
import ContributionCard from '@/components/contributionCard'
import { poppins, ibm_plex_mono } from '@/fonts'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import { LuMail } from 'react-icons/lu'
import DateDisplay from '@/components/dateDisplay'
import ShinyCard from '@/components/shinyCard'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const blogs = await getBlogs()
  const contributions = await getMergedContributions()
  const allViews = await getViewsCount()

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
            href={`mailto:${siteMetadata.email || 'hello@swapnaneel.me'}`}
            className="btn"
          >
            <LuMail className="w-4 h-4" />
            Email
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
                <Link key={post.slug} href={`/posts/${post.slug}`}>
                  <ShinyCard
                    containerClassName="h-full rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600 transition-colors"
                    className="h-full flex flex-col p-4 bg-gray-50/50 dark:bg-zinc-800/50 rounded-xl"
                  >
                    {/* Top metadata: date left, views right */}
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <DateDisplay date={post.data.publishedAt} />
                      {viewCount > 0 && (
                        <span className={`flex items-center gap-1 ${ibm_plex_mono.className}`}>
                          <span>{viewCount}</span>
                          <span>views</span>
                        </span>
                      )}
                    </div>
                    {/* Title */}
                    <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                      {post.data.title}
                    </h3>
                    {/* Description */}
                    {post.data.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {post.data.description}
                      </p>
                    )}
                  </ShinyCard>
                </Link>
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

      {/* Skills */}
      <SkillsSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
