'use client'

import Link from 'next/link'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <section className="max-w-md text-center">
        <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-3">Something went wrong</p>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
          This page could not load.
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Try again, or return home while the data catches up.
        </p>
        <div className="flex justify-center gap-3">
          <button type="button" onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <Link href="/" className="btn">
            Go home
          </Link>
        </div>
      </section>
    </main>
  )
}