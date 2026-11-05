"use client"

import { Link } from 'next-view-transitions'
import DateDisplay from '@/components/dateDisplay'

type Props = {
  slug: string
  title: string
  description?: string
  publishedAt: string
  viewCount?: number
  tags?: string[]
}

export default function PostCard({ slug, title, publishedAt, viewCount = 0 }: Props) {
  return (
    <Link 
      href={`/posts/${slug}`} 
      className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 py-5 sm:py-6 border-b border-gray-100 dark:border-zinc-800/50 last:border-0 transition-all"
      aria-label={`Read ${title}`}
    >
      <span className="text-sm text-gray-400 font-mono w-28 shrink-0">
        <DateDisplay date={publishedAt} />
      </span>
      
      <div className="flex-grow flex items-center justify-between w-full">
        <h3 
          className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 group-hover:translate-x-2 transition-transform duration-300"
          style={{ viewTransitionName: `post-title-${slug}` }}
        >
          {title}
        </h3>
        
        {viewCount > 0 && (
          <span className="text-xs text-gray-400 dark:text-gray-500 font-mono shrink-0 ml-4 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {viewCount} views
          </span>
        )}
      </div>
    </Link>
  )
}
