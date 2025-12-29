"use client"

import Link from "next/link"
import PostCard from "@/components/postCard"
import { poppins } from "@/fonts"
import { BlogMetadata } from "@/utils/getBlogs"

type Props = {
  posts: BlogMetadata[]
  views: { slug: string; count: number }[]
}

export default function WritingSection({ posts, views }: Props) {
  return (
    <section className="mb-16">
      <div className="section-header">
        <h2 className={poppins.className}>Writing</h2>
        <Link
          href="/posts"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {posts.length > 0 ? (
          posts.map((post) => {
            const viewCount = views.find((v) => v.slug === post.slug)?.count || 0
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
