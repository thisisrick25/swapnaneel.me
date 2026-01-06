export function SectionSkeleton() {
  return (
    <section className="mb-12 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-6"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-zinc-800"></div>
        ))}
      </div>
    </section>
  )
}

export function ContributionSkeleton() {
  return (
    <section className="mb-12 animate-pulse">
      <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-6"></div>
      <div className="h-40 bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-zinc-800"></div>
    </section>
  )
}
