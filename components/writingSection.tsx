import Link from "next/link"
import PostCard from "@/components/postCard"
import { poppins } from "@/fonts"
import { getBlogs } from "@/utils/getBlogs"
import { getViewsCount } from "@/db/queries"

export default async function WritingSection() {
  const blogs = await getBlogs()
  const allViews = await getViewsCount()

  const posts = blogs.slice(0, 4)

  return (
    <section className="mb-12">
      <div className="section-header">
        <h2 className={poppins.className}>Articles</h2>
        <Link
          href="/posts"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {posts.length > 0 ? (
          posts.map((post) => {
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
  )
}
