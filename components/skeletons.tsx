/* Shared skeleton primitives with consistent styling across all homepage sections.
   Base style: bg-gray-200 dark:bg-zinc-700 rounded animate-pulse (from globals.css .skeleton)
   Card/block style: bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-zinc-800
*/

export function SkeletonLine({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} />
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`h-24 bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-zinc-800 ${className}`} />
  )
}

export function SkeletonAvatar({ className = '' }: { className?: string }) {
  return (
    <div className={`skeleton w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] rounded-xl shrink-0 ${className}`} />
  )
}

export function SkeletonSectionHeader({ withDescription = false }: { withDescription?: boolean } = {}) {
  return (
    <div className="mb-6">
      <div className="skeleton h-8 w-48 rounded mb-3" />
      {withDescription && <div className="skeleton h-5 w-32 mb-6" />}
    </div>
  )
}

/* Exact structural clones of each homepage section */

export function HeroSkeleton() {
  return (
    <section className="mb-12 animate-pulse" id="top">
      <div className="flex items-start gap-5 mb-8">
        <SkeletonAvatar />
        <div>
          <div className="skeleton h-10 w-48 mb-2" />
          <div className="skeleton h-6 w-32" />
        </div>
      </div>
      <div className="skeleton h-6 w-full max-w-2xl mb-6" />
      <div className="flex flex-wrap gap-5 mt-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton h-10 w-24 rounded-lg" />
        ))}
      </div>
    </section>
  )
}

export function NewsSkeleton() {
  return (
    <section className="mb-12 animate-pulse">
      <div className="section-header mb-4 flex justify-between items-baseline">
        <div>
          <div className="skeleton h-8 w-24 rounded mb-1" />
          <div className="skeleton h-5 w-32 mb-6" />
        </div>
        <div className="skeleton h-10 w-16 rounded" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 text-sm">
            <div className="skeleton h-5 w-30 shrink-0" />
            <div className="skeleton h-5 w-full" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function ProjectSkeleton() {
  return (
    <section className="mb-12 animate-pulse" id="projects">
      <div className="section-header mb-4 flex items-baseline justify-between">
        <div>
          <div className="skeleton h-8 w-32 rounded mb-1" />
          <div className="skeleton h-5 w-48 mb-6" />
        </div>
        <div className="skeleton h-10 w-20 rounded" />
      </div>
      <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3 hover-dim">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-full hover-dim-item">
            <SkeletonCard className="w-full" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function EducationSkeleton() {
  return (
    <section className="mb-12 animate-pulse">
      <div className="section-header mb-6">
        <div className="skeleton h-8 w-20 rounded mb-3" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <div className="skeleton h-5 w-full block" />
            <div className="skeleton h-4 w-3/4 block mt-0.5" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function PublicationSkeleton() {
  return (
    <section className="mb-12 animate-pulse">
      <div className="section-header mb-6 flex justify-between items-baseline">
        <div>
          <div className="skeleton h-8 w-24 rounded" />
        </div>
        <div className="skeleton h-10 w-20 rounded" />
      </div>
      <div className="space-y-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-full">
            <SkeletonCard className="w-full" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function WritingSkeleton() {
  return (
    <section className="mb-12 animate-pulse" id="writing">
      <div className="section-header">
        <div>
          <div className="skeleton h-8 w-24 rounded mb-1" />
          <div className="skeleton h-5 w-64 mb-6" />
        </div>
        <div className="skeleton h-10 w-20 rounded" />
      </div>
      <div className="flex flex-col hover-dim">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-full hover-dim-item">
            <SkeletonCard className="w-full" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function ContributionSkeleton() {
  return (
    <section className="mb-12 animate-pulse">
      <div className="section-header">
        <div>
          <div className="skeleton h-8 w-48 rounded mb-1" />
          <div className="skeleton h-5 w-80 mb-6" />
        </div>
        <div className="skeleton h-10 w-20 rounded" />
      </div>
      <div className="flex flex-col hover-dim">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-full hover-dim-item">
            <SkeletonCard className="w-full" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function ContributionGraphSkeleton() {
  return (
    <section className="mb-12 animate-pulse">
      <div className="skeleton h-8 w-24 mb-6" />
      <div className="h-40 bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-zinc-800" />
    </section>
  )
}

export function SkillsSkeleton() {
  return (
    <section className="mb-12 animate-pulse">
      <div className="skeleton h-8 w-32 mb-4" />
      <div className="flex flex-wrap gap-2 mb-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="skeleton h-9 w-20 rounded-full shrink-0" />
        ))}
      </div>
      <div className="p-5 border border-gray-200 dark:border-zinc-700 rounded-xl">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="skeleton h-6 w-24 rounded-md shrink-0" />
          ))}
        </div>
      </div>
    </section>
  )
}
