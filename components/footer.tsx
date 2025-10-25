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
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
        >
          linkedin
        </Link>
        <Link
          href={siteMetadata.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
        >
          github
        </Link>
      </div>
    </footer>
  )
}
