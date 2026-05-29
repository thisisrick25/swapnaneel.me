"use client"

import Tag from '@/components/tag'
import { Project } from '@/utils/getProjects'

export default function ProjectCard({ title, description, link, techStack }: Project) {
  // Simple slug for view transitions if needed, or just unique ID
  const slug = title.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="group relative overflow-hidden h-full flex flex-col p-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/50 hover:border-gray-300 dark:hover:border-zinc-600 hover:shadow-lg dark:hover:shadow-gray-500/10 transition-colors transition-shadow">
      {/* SECTION 1: CONTENT */}
      <div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold mb-1.5 text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors line-clamp-2 block"
          style={{ viewTransitionName: `project-title-${slug}` }}
        >
          {title}
        </a>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3">
          {description}
        </p>
      </div>

      {/* SECTION 2: METADATA */}
      <div className="mt-auto pt-4">
        <Tag tags={techStack} asLinks={false} />
      </div>
    </div>
  )
}
