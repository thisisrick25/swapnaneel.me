"use client"

import { Link } from 'next-view-transitions'
import { Fragment } from "react"
import { PublicationAuthor } from "@/utils/getPublications"

interface PublicationCardProps {
  title: string
  authors: PublicationAuthor[]
  venue: string
  year: string
  type: string
  status?: string | null
  links?: { label: string; url: string }[]
}

export default function PublicationCard({ title, authors, venue, year, type, status, links }: PublicationCardProps) {

  return (
    <article className="py-4">
      <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 line-clamp-2 mb-1">
        {title}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-0.5">
        {authors.map((author, index) => (
          <Fragment key={author.name}>
            <span className={author.isMe ? "font-semibold" : undefined}>{author.name}</span>
            {index < authors.length - 1 && ", "}
          </Fragment>
        ))}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-2 line-clamp-1">
        {venue}
      </p>

      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
        <span>[<span className="text-gray-700 dark:text-gray-200">{year}</span>]</span>
        <span>[<span className="text-blue-700 dark:text-blue-300 capitalize">{type}</span>]</span>
        {links?.map((link, i) => {
          const isPlaceholder = link.url === '#'
          return (
            <Link
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors cursor-pointer ${isPlaceholder ? 'text-gray-500 dark:text-gray-400' : 'text-gray-500 dark:text-gray-400 hover:underline'}`}
            >
              [{link.label}]
            </Link>
          )
        })}
      </div>
    </article>
  )
}
