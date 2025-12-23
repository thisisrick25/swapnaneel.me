export default function Loading() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container animate-pulse">
        <section className="mb-12">
          <div className="skeleton h-9 w-24 mb-2" />
          <div className="skeleton h-5 w-64" />
        </section>

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 rounded-xl">
              <div className="skeleton h-5 w-3/4 mb-2" />
              <div className="skeleton h-4 w-1/2 mb-2" />
              <div className="skeleton h-3 w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}