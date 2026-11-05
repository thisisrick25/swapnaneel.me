"use client"

import { Project } from '@/utils/getProjects'
import { LuArrowUpRight } from "react-icons/lu"
import { fira_code } from '@/fonts'

export default function ProjectCard({ title, description, link, techStack }: Project) {
  const slug = title.toLowerCase().replace(/\s+/g, '-')

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full p-5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent hover:-translate-y-1 hover:border-teal-500/50 hover:shadow-sm transition-all duration-300"
      aria-label={`View ${title} project`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3
          className="text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2"
          style={{ viewTransitionName: `project-title-${slug}` }}
        >
          {title}
        </h3>
        <LuArrowUpRight className="w-5 h-5 text-gray-400 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all shrink-0" />
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-6 flex-grow">
        {description}
      </p>

      {techStack && techStack.length > 0 && (
        <div className={`mt-auto text-xs text-gray-400 dark:text-gray-500 ${fira_code.className}`}>
          {techStack.join(' · ')}
        </div>
      )}
    </a>
  )
}
