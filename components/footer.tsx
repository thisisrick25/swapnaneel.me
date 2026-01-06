import { cacheLife } from 'next/cache'

export default async function Footer() {
  'use cache'
  cacheLife('days')

  return (
    <footer className="py-16 pb-24 text-center">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Swapnaneel Patra
      </p>
    </footer>
  )
}
