import { cacheLife } from 'next/cache'

export default async function Footer() {
  'use cache'
  cacheLife('days')

  return (
    <footer className="py-16 pb-24 text-center">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Swapnaneel Patra
      </p>
      <details className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        <summary className="cursor-pointer hover:text-gray-900 dark:hover:text-white">Site resources</summary>
        <nav className="mt-2 flex justify-center gap-3" aria-label="Site resources">
          <a href="/llms.txt" className="hover:text-gray-900 dark:hover:text-white transition-colors">LLM text</a>
          <a href="/robots.txt" className="hover:text-gray-900 dark:hover:text-white transition-colors">Robots</a>
          <a href="/sitemap.xml" className="hover:text-gray-900 dark:hover:text-white transition-colors">Sitemap</a>
        </nav>
      </details>
    </footer>
  )
}
