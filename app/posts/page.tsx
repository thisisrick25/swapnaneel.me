import { Metadata } from 'next'
import { getBlogs } from '@/utils/getBlogs'
import { getViewsCount } from '@/db/queries'
import { poppins } from '@/fonts'
import PostCard from '@/components/postCard'
import BackLink from '@/components/backLink'
import { StaggerContainer, StaggerItem } from '@/components/stagger'

export function generateMetadata(): Metadata {
  return {
    title: 'Posts',
    description: 'Technical writing about software engineering, machine learning, and other topics.',
  }
}

export default async function Page() {
  const blogs = await getBlogs()
  const allViews = await getViewsCount()

  return (
    <div className="py-16 sm:py-24">
      {/* Header */}
      <section className="mb-12">
        <BackLink />
        <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-2 ${poppins.className}`}>Posts</h1>
        <p className="text-base text-gray-600 dark:text-gray-300">
          Technical writing and thoughts on software engineering.
        </p>
      </section>

      {/* Posts Grid */}
      <StaggerContainer className="grid gap-3 sm:grid-cols-2">
        {blogs.length > 0 ? (
          blogs.map((blog) => {
            const viewCount = allViews.find((v) => v.slug === blog.slug)?.count || 0
            return (
              <StaggerItem key={blog.slug}>
                <PostCard
                  slug={blog.slug}
                  title={blog.data.title}
                  description={blog.data.description}
                  publishedAt={blog.data.publishedAt}
                  viewCount={viewCount}
                  tags={blog.data.tags}
                />
              </StaggerItem>
            )
          })
        ) : (
          <p className="text-sm">No posts yet.</p>
        )}
      </StaggerContainer>

    </div>
  )
}
