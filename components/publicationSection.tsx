import { poppins } from "@/fonts"
import Link from "next/link"
import { LuExternalLink, LuFileText, LuGitPullRequest } from "react-icons/lu" // Added LuGitPullRequest
import { getPublications, Publication } from "@/utils/getPublications"

export default async function PublicationSection() {
  const publications = await getPublications()

  const conferences = publications.filter(p => p.type === 'conference')
  const journals = publications.filter(p => p.type === 'journal')
  const preprints = publications.filter(p => p.type === 'preprint')

  if (publications.length === 0) return null

  // Helper to choose icon based on label
  const getIconForLabel = (label: string) => {
    const lower = label.toLowerCase()
    if (lower.includes('pdf')) return LuFileText
    if (lower.includes('code') || lower.includes('github')) return LuGitPullRequest
    return LuExternalLink
  }

  const renderPublicationList = (items: Publication[]) => (
    <div className="space-y-6">
      {items.map((pub, index) => (
        <div key={index} className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {pub.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {pub.authors}
          </p>
          <div className="flex items-center gap-3 text-sm mt-1">
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {pub.publishedAt}
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
  )

  return (
    <section className="mb-12">
      <div className="section-header mb-6">
        <h2 className={poppins.className}>Publications</h2>
      </div>

      <div className="space-y-8">
        {conferences.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Refereed Conference Papers
            </h3>
            {renderPublicationList(conferences)}
          </div>
        )}

        {journals.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Journal Articles
            </h3>
            {renderPublicationList(journals)}
          </div>
        )}

        {preprints.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Preprints / Archives
            </h3>
            {renderPublicationList(preprints)}
          </div>
        )}
      </div>
    </section>
  )
}
