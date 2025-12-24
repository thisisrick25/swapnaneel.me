"use client"

import { useRef, useState, MouseEvent } from 'react'
import Link from 'next/link'
import DateDisplay from '@/components/dateDisplay'
import BorderBeam from '@/components/borderBeam'
import { GIT_USERNAME } from '@/lib/constants'
import { LuExternalLink, LuGitMerge } from 'react-icons/lu'
import { SiGithub, SiGitlab } from 'react-icons/si'

type Props = {
  id: number
  title: string
  repo: string
  link: string
  mergedAt?: string | null
  relatedIssues?: string[]
  source: 'github' | 'gitlab'
  showLink?: boolean
}

export default function ContributionItem({ title, repo, link, mergedAt, relatedIssues, source, id, showLink = true }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const repoUrl = source === 'github' ? `https://github.com/${repo}` : `https://gitlab.com/${repo}`
  const sourceUrl = source === 'github' ? `https://github.com/${GIT_USERNAME}` : `https://gitlab.com/${GIT_USERNAME}`

  const repoSlug = repo?.replace("/", "-") || "unknown";
  const dateStr = mergedAt ? mergedAt.slice(0, 10).replace(/-/g, "") : "00000000";
  const slug = `${dateStr}-${repoSlug}-${id}`;

  const extractIssueNumber = (url: string): string => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => {
    setOpacity(1)
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setOpacity(0)
    setIsHovered(false)
  }

  const SourceIcon = source === 'github' ? SiGithub : SiGitlab
  const sourceColor = source === 'github'
    ? 'text-gray-600 dark:text-gray-400'
    : 'text-orange-600 dark:text-orange-400'

  const cardContent = (
    <>
      {/* Shine effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 rounded-xl z-20"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 z-20"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />

      {/* Card content */}
      <div className="relative h-full flex flex-col p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl">
        {/* Header: repo tag + source icon + arrow */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tag hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
            >
              {repo}
            </a>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${sourceColor} hover:opacity-70 transition-opacity`}
              title={source === 'github' ? 'GitHub' : 'GitLab'}
            >
              <SourceIcon className="w-4 h-4" />
            </a>
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            title="View PR on GitHub/GitLab"
            className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <LuExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Title - reserves 2 lines of space, links to writeup */}
        {showLink ? (
          <Link
            href={`/contributions/${slug}`}
            className="text-sm font-semibold line-clamp-2 min-h-10 mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block"
          >
            {title}
          </Link>
        ) : (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold line-clamp-2 min-h-10 mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block"
          >
            {title}
          </a>
        )}

        {/* Merge status + date */}
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
            <LuGitMerge className="w-3 h-3" />
            Merged
          </span>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <span>
            <DateDisplay date={mergedAt || ''} />
          </span>
        </div>

        {/* Related issues */}
        {relatedIssues && relatedIssues.length > 0 && (
          <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            Fixes: {relatedIssues.filter(Boolean).map((issueUrl, idx) => (
              <span key={issueUrl}>
                {idx > 0 && ', '}
                <a
                  href={issueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  #{extractIssueNumber(issueUrl)}
                </a>
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  )

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-full"
    >
      <BorderBeam
        active={isHovered}
        rounded="rounded-xl"
        bgClassName="bg-white dark:bg-zinc-900"
        className="h-full overflow-hidden"
      >
        {cardContent}
      </BorderBeam>
    </div>
  )
}
