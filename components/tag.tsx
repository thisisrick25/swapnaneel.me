"use client"

import { Link } from "next-view-transitions"
import githubSlugger from "github-slugger"
import { ibm_plex_mono } from "@/fonts"
import { useState } from "react"

interface TagProps {
  tags: string[]
  maxTags?: number
  asLinks?: boolean
}

export default function Tag({ tags, maxTags = 4, asLinks = true }: TagProps) {
  const [clickedTag, setClickedTag] = useState<string | null>(null)
  const slugger = new githubSlugger()
  const displayTags = tags.slice(0, maxTags)
  const remainingCount = tags.length - maxTags

  const tagClassName = `px-1.5 py-0.5 text-[8px] font-medium border border-gray-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 transition-all hover:shadow-[0_0_4px_rgba(59,130,246,0.3)] dark:hover:shadow-[0_0_4px_rgba(147,197,253,0.3)] ${ibm_plex_mono.className}`

  return (
    <div className="flex flex-wrap gap-1">
      {displayTags.map((tag) => {
        const tagSlug = slugger.slug(tag)
        return asLinks ? (
          <Link
            key={tag}
            href={`/tags/${tagSlug}`}
            className={tagClassName}
            style={{
              viewTransitionName: clickedTag === tagSlug ? `tag-${tagSlug}` : "none",
            }}
            onClick={() => {
              setClickedTag(tagSlug)
            }}
          >
            #{tag}
          </Link>
        ) : (
          <span key={tag} className={tagClassName}>
            #{tag}
          </span>
        )
      })}
      {remainingCount > 0 && (
        <span className="text-xs text-gray-400 dark:text-gray-500 self-center">
          +{remainingCount}
        </span>
      )}
    </div>
  )
}
