"use client"

import { Link } from 'next-view-transitions'
import DateDisplay from '@/components/dateDisplay'
import Tag from '@/components/tag'
import { fira_code } from '@/fonts'

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
    <div className="group relative overflow-hidden h-full flex flex-col p-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/50 hover:border-gray-300 dark:hover:border-zinc-600 hover:shadow-lg dark:hover:shadow-gray-500/10 transition-colors transition-shadow">
      {/* Overlay link for the entire card */}
      <Link
        href={`/posts/${slug}`}
        className="absolute inset-0 z-0"
        aria-label={title}
      />

      {/* SECTION 1: CONTENT */}
      <div className="relative z-10 pointer-events-none">
        <h3
          className="text-sm font-semibold mb-1.5 text-gray-900 dark:text-gray-100 line-clamp-2"
          style={{ viewTransitionName: `post-title-${slug}` }}
        >
          {title}
        </h3>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* SECTION 2: METADATA */}
      <div className="mt-auto pt-4 flex flex-col gap-2.5 relative z-10 pointer-events-none">
        {/* Tags - clickable, restore pointer events */}
        {tags && tags.length > 0 && (
          <div className="pointer-events-auto">
            <Tag tags={tags} asLinks={true} />
          </div>
        )}

        {/* Date & Views Row */}
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <DateDisplay date={publishedAt} />
          {viewCount > 0 && (
            <span>{viewCount} views</span>
          )}
        </div>
      </div>
    </div>
  )
}
