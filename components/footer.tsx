import { cacheLife } from 'next/cache'

export default async function Footer() {
  'use cache'
  cacheLife('days')

  return (
    <footer className="py-16 pb-24 text-center">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Swapnaneel Patra
      </p>
      <p className="text-xs mt-2 text-gray-500 dark:text-gray-400 mb-2">
        <a href="/llms.txt" className="hover:text-gray-900 dark:hover:text-white transition-colors">/llms.txt</a>
        <span className="mx-2"></span>
        <a href="/robots.txt" className="hover:text-gray-900 dark:hover:text-white transition-colors">/robots.txt</a>
        <span className="mx-2"></span>
        <a href="/sitemap.xml" className="hover:text-gray-900 dark:hover:text-white transition-colors">/sitemap.xml</a>
      </p>
    </footer>
  )
}
