import Link from 'next/link'
import { siteMetadata } from '@/utils/siteMetadata'

export default function Footer() {
  return (
    <footer className="mx-auto mt-16 flex flex-col items-center">
      <div className="mb-3 flex space-x-4">
        <Link
          href={siteMetadata.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-neutral-600 transition hover:text-neutral-400"
        >
          linkedin
        </Link>
        <Link
          href={siteMetadata.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-neutral-600 transition hover:text-neutral-400"
        >
          github
        </Link>
      </div>
    </footer>
  )
}
