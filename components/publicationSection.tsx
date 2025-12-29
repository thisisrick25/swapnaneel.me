"use client"

import { poppins } from "@/fonts"
import Link from "next/link"
import { ExternalLink, FileText } from "lucide-react"

type PublicationType = 'conference' | 'journal'

interface Publication {
  title: string
  authors: string
  venue: string
  date: string
  type: PublicationType
  links?: { label: string; url: string; icon: any }[]
}

export default function PublicationSection() {
  const publications: Publication[] = [
    {
      title: "Conference Paper Title",
      authors: "Swapnaneel Patra, Co-author Name",
      venue: "Conference Name (CONF '25)",
      date: "2025",
      type: "conference",
      links: [
        { label: "PDF", url: "#", icon: FileText },
        { label: "Code", url: "#", icon: ExternalLink },
      ]
    },
    {
      title: "Journal Article Title",
      authors: "Swapnaneel Patra, Co-author Name",
      venue: "Journal Name (Vol. 1)",
      date: "2025",
      type: "journal",
      links: [
        { label: "PDF", url: "#", icon: FileText },
      ]
    }
  ]

  const conferences = publications.filter(p => p.type === 'conference')
  const journals = publications.filter(p => p.type === 'journal')

  if (publications.length === 0) return null

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
              {pub.venue}
            </span>
            <span className="text-gray-400 dark:text-gray-500">•</span>
            <span className="text-gray-500 dark:text-gray-400">{pub.date}</span>

            {pub.links && pub.links.length > 0 && (
              <>
                <span className="text-gray-400 dark:text-gray-500">•</span>
                <div className="flex gap-3">
                  {pub.links.map((link, i) => (
                    <Link
                      key={i}
                      href={link.url}
                      target="_blank"
                      className="flex items-center gap-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.icon && <link.icon className="w-3.5 h-3.5" />}
                      {link.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <section className="mb-16">
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
      </div>
    </section>
  )
}
