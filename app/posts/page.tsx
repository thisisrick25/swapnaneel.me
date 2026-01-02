import { Metadata } from 'next'
import Link from 'next/link'
import { getBlogs } from '@/utils/getBlogs'
import { getViewsCount } from '@/db/queries'
import { poppins } from '@/fonts'
import PostCard from '@/components/postCard'

export const dynamic = 'force-dynamic'

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
        <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-2 ${poppins.className}`}>Posts</h1>
        <p className="text-base text-gray-600 dark:text-gray-300">
          Technical writing and thoughts on software engineering.
        </p>
      </section>

      {/* Posts Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {blogs.length > 0 ? (
          blogs.map((blog) => {
            const viewCount = allViews.find((v) => v.slug === blog.slug)?.count || 0
            return (
              <PostCard
                key={blog.slug}
                slug={blog.slug}
                title={blog.data.title}
                description={blog.data.description}
                publishedAt={blog.data.publishedAt}
                viewCount={viewCount}
                tags={blog.data.tags}
              />
            )
          })
        ) : (
          <p className="text-sm">No posts yet.</p>
        )}
      </div>

      {/* Footer space for floating nav */}
      <div className="h-24" />
    </div>
  )
}
