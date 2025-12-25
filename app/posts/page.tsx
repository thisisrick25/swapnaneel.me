import { Metadata } from 'next'
import Link from 'next/link'
import { getBlogs } from '@/utils/getBlogs'
import { getViewsCount } from '@/db/queries'
import { poppins } from '@/fonts'
import DateDisplay from '@/components/dateDisplay'
import { LuEye } from 'react-icons/lu'

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

      {/* Posts List */}
      <div className="space-y-1">
        {blogs.length > 0 ? (
          blogs.map((blog) => {
            const viewCount = allViews.find((v) => v.slug === blog.slug)?.count || 0
            return (
              <Link
                key={blog.slug}
                href={`/posts/${blog.slug}`}
                className="list-item"
              >
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold mb-1">
                    {blog.data.title}
                  </h2>
                  {blog.data.description && (
                    <p className="text-sm line-clamp-1 mb-2">
                      {blog.data.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      <DateDisplay date={blog.data.publishedAt} />
                    </span>
                    {viewCount > 0 && (
                      <>
                        <span className="text-gray-300 dark:text-gray-600">·</span>
                        <span className="flex items-center gap-1">
                          <LuEye className="w-3 h-3" />
                          {viewCount.toLocaleString()} views
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
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
