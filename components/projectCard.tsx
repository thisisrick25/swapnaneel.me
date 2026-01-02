"use client"

import { Link } from 'next-view-transitions'
import ShinyCard from '@/components/shinyCard'
import Tag from '@/components/tag'
import { LuExternalLink } from 'react-icons/lu'
import { ibm_plex_mono } from '@/fonts'
import { Project } from '@/utils/getProjects'

export default function ProjectCard({ title, description, link, techStack }: Project) {
  // Simple slug for view transitions if needed, or just unique ID
  const slug = title.toLowerCase().replace(/\s+/g, '-')

  return (
    <ShinyCard
      containerClassName="group relative h-full rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600 hover:shadow-lg dark:hover:shadow-gray-500/10 transition-all"
      className="h-full flex flex-col p-4 bg-gray-50/50 dark:bg-zinc-800/50 rounded-xl"
    >
      {/* Header: Title + Link */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
          {title}
        </h3>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          title="View Project"
        >
          <LuExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 grow">
        {description}
      </p>

      {/* Tech Stack Tags */}
      <div className="mt-auto">
        <Tag tags={techStack} asLinks={false} />
      </div>
    </ShinyCard>
  )
}
