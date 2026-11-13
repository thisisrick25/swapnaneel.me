"use client"

import { Link } from 'next-view-transitions'
import { Fragment } from "react"
import { PublicationAuthor, PublicationMetaItem } from "@/utils/getPublications"

interface PublicationCardProps {
  title: string
  authors: PublicationAuthor[]
  venue: string
  meta: PublicationMetaItem[]
}

export default function PublicationCard({ title, authors, venue, meta }: PublicationCardProps) {

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
        {meta.map((item, i) => (
          <Fragment key={i}>
            <span className="text-gray-700 dark:text-gray-200">[</span>
            {item.kind === 'link' && item.url ? (
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors cursor-pointer ${item.url === '#' ? 'text-gray-500 dark:text-gray-400 cursor-default' : 'text-gray-500 dark:text-gray-400 hover:underline'}`}
              >
                {item.label}
              </Link>
            ) : (
              <span className={`text-gray-700 dark:text-gray-200 ${item.kind === 'type' ? 'capitalize' : ''}`}>
                {item.label}
              </span>
            )}
            <span className="text-gray-700 dark:text-gray-200">]</span>
          </Fragment>
        ))}
      </div>
    </article>
  )
}
