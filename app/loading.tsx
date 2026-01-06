export default function Loading() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container animate-pulse">
        {/* Profile skeleton */}
        <section className="mb-16">
          <div className="flex items-start gap-5 mb-8">
            <div className="skeleton w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] rounded-xl shrink-0" />
            <div>
              <div className="skeleton h-9 w-56 mb-2" />
              <div className="skeleton h-5 w-32" />
            </div>
          </div>
          <div className="skeleton h-5 w-full max-w-2xl mb-2" />
          <div className="skeleton h-5 w-3/4 max-w-2xl mb-6" />
          <div className="flex gap-3">
            <div className="skeleton h-9 w-24 rounded-lg" />
            <div className="skeleton h-9 w-24 rounded-lg" />
            <div className="skeleton h-9 w-20 rounded-lg" />
          </div>
        </section>

        {/* Writing skeleton */}
        <section className="mb-16">
          <div className="skeleton h-8 w-24 mb-6" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="py-4">
              <div className="skeleton h-5 w-3/4 mb-2" />
              <div className="skeleton h-4 w-1/2" />
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}