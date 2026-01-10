import ViewAllLink from "@/components/viewAllLink"
import PostCard from "@/components/postCard"
import { poppins } from "@/fonts"
import { getBlogs } from "@/utils/getBlogs"
import { getViewsCount } from "@/db/queries"
import { StaggerContainer, StaggerItem } from "@/components/stagger"

export default async function WritingSection() {
  const blogs = await getBlogs()
  const allViews = await getViewsCount()

  const posts = blogs.slice(0, 6)

  return (
    <section className="mb-12">
      <div className="section-header">
        <h2 className={poppins.className}>Articles</h2>
        <ViewAllLink href="/posts" />
      </div>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {posts.length > 0 ? (
          posts.map((post) => {
            const viewCount = allViews.find((v) => v.slug === post.slug)?.count || 0
            return (
              <StaggerItem key={post.slug}>
                <PostCard
                  slug={post.slug}
                  title={post.data.title}
                  description={post.data.description}
                  publishedAt={post.data.publishedAt}
                  viewCount={viewCount}
                  tags={post.data.tags}
                />
              </StaggerItem>
            )
          })
        ) : (
          <p className="text-sm">No posts yet.</p>
        )}
      </StaggerContainer>
    </section>
  )
}
