import Link from "next/link"
import githubSlugger from "github-slugger"
import { ibm_plex_mono } from "@/fonts"

interface TagProps {
  tags: string[]
  maxTags?: number
}

export default function Tag({ tags, maxTags = 4 }: TagProps) {
  const slugger = new githubSlugger()
  const displayTags = tags.slice(0, maxTags)
  const remainingCount = tags.length - maxTags

  return (
    <div className="flex flex-wrap gap-1">
      {displayTags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${slugger.slug(tag)}`}
          className={`px-1.5 py-0.5 text-xs font-extralight border border-gray-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors ${ibm_plex_mono.className}`}
        >
          #{tag}
        </Link>
      ))}
      {remainingCount > 0 && (
        <span className="text-xs text-gray-400 dark:text-gray-500 self-center">
          +{remainingCount}
        </span>
      )}
    </div>
  )
}