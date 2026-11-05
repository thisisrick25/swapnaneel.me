import { space_grotesk } from "@/fonts"
import { Fragment } from "react"
import { Link } from 'next-view-transitions'
import { LuExternalLink, LuFileText, LuGitPullRequest } from "react-icons/lu"
import { getPublications, PublicationAuthor, PublicationType } from "@/utils/getPublications"
import ViewAllLink from '@/components/viewAllLink'

export default async function PublicationSection() {
  const publications = await getPublications()

  if (publications.length === 0) return null

  // Take top 4 latest publications across all types
  const displayPublications = publications.slice(0, 4)

  // Helper to choose icon based on label
  const getIconForLabel = (label: string) => {
    const lower = label.toLowerCase()
    if (lower.includes('pdf')) return LuFileText
    if (lower.includes('code') || lower.includes('github')) return LuGitPullRequest
    return LuExternalLink
  }

  const getTypeStyles = (type: PublicationType) => {
    switch (type) {
      case 'conference':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
      case 'journal':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
      case 'preprint':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  const renderAuthors = (authors: PublicationAuthor[]) => {
    return authors.map((author, index) => (
      <Fragment key={author.name}>
        <span className={author.isMe ? "font-semibold" : undefined}>{author.name}</span>
        {index < authors.length - 1 && ", "}
      </Fragment>
    ))
  }

  return (
    <section className="mb-12">
      <div className="section-header mb-6 flex justify-between items-baseline">
        <div>
          <h2 className={space_grotesk.className}>Publications</h2>
        </div>
        <ViewAllLink href="/publications" />
      </div>

      <div className="space-y-6">
        {displayPublications.map((pub, index) => (
          <div key={index} className="flex flex-col gap-1">
            <p className="text-gray-900 dark:text-gray-100 text-sm leading-6">
              {renderAuthors(pub.authors)} ({pub.year}), “{pub.title}”, <em>{pub.venue}</em>
            </p>
            <div className="flex items-center flex-wrap gap-2 text-sm mt-1">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeStyles(pub.type)}`}>
                {pub.type}
              </span>
              <span className="text-gray-400 dark:text-gray-500">•</span>
              <span className="text-gray-500 dark:text-gray-400">{pub.year}</span>
              {pub.status && (
                <><span className="text-gray-400 dark:text-gray-500">•</span><span className="text-amber-700 dark:text-amber-300">({pub.status})</span></>
              )}
              {pub.paperId && (
                <span className="text-gray-500 dark:text-gray-400">Paper ID: {pub.paperId}</span>
              )}

              {pub.links && pub.links.length > 0 && (
                <>
                  <span className="text-gray-400 dark:text-gray-500">•</span>
                  <div className="flex gap-3">
                    {pub.links.map((link, i) => {
                      const Icon = getIconForLabel(link.label)
                      return (
                        <Link
                          key={i}
                          href={link.url}
                          target="_blank"
                          className="flex items-center gap-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {link.label}
                        </Link>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
