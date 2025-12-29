import { poppins } from "@/fonts"
import Link from "next/link"
import { LuExternalLink, LuFileText, LuGitPullRequest } from "react-icons/lu"
import { getPublications, Publication, PublicationType } from "@/utils/getPublications"

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

  return (
    <section className="mb-12">
      <div className="section-header mb-6 flex justify-between items-baseline">
        <h2 className={poppins.className}>Publications</h2>
        <Link
          href="/publications"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="space-y-6">
        {displayPublications.map((pub, index) => (
          <div key={index} className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {pub.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {pub.authors}
            </p>
            <div className="flex items-center flex-wrap gap-2 text-sm mt-1">
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {pub.publishedAt}
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeStyles(pub.type)}`}>
                {pub.type}
              </span>
              <span className="text-gray-400 dark:text-gray-500">•</span>
              <span className="text-gray-500 dark:text-gray-400">{pub.date}</span>

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
