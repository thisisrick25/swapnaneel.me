"use client"

import { Link } from 'next-view-transitions'
import DateDisplay from '@/components/dateDisplay'
import ShinyCard from '@/components/shinyCard'
import Tag from '@/components/tag'
import { ibm_plex_mono } from '@/fonts'

type Props = {
  slug: string
  title: string
  description?: string
  publishedAt: string
  viewCount?: number
  tags?: string[]
}

export default function PostCard({ slug, title, description, publishedAt, viewCount = 0, tags }: Props) {
  return (
    <ShinyCard
      containerClassName="group relative h-full rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600 hover:shadow-lg dark:hover:shadow-gray-500/10 transition-all"
      className="h-full flex flex-col p-4 bg-gray-50/50 dark:bg-zinc-800/50 rounded-xl"
    >
      {/* Overlay link for the entire card */}
      <Link
        href={`/posts/${slug}`}
        className="absolute inset-0 z-0"
        aria-label={title}
      />

      {/* Top metadata: date left, views right */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2 relative z-10 pointer-events-none">
        <DateDisplay date={publishedAt} />
        {viewCount > 0 && (
          <span className={`flex items-center gap-1 ${ibm_plex_mono.className}`}>
            <span>{viewCount}</span>
            <span>views</span>
          </span>
        )}
      </div>

      {/* Title - with view transition name */}
      <h3
        className="text-sm font-semibold mb-1 line-clamp-2 relative z-10 pointer-events-none"
        style={{ viewTransitionName: `post-title-${slug}` }}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2 relative z-10 pointer-events-none">
          {description}
        </p>
      )}

      {/* Tags - clickable, above the overlay link */}
      {tags && tags.length > 0 && (
        <div className="mt-auto relative z-10">
          <Tag tags={tags} asLinks={true} />
        </div>
      )}
    </ShinyCard>
  )
}
