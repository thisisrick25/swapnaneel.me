export default function Loading() {
  return (
    <article className="animate-pulse">
      <div>
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
        <div className="grid grid-cols-2 text-sm mb-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 ml-auto"></div>
        </div>
        <div className="flex space-x-2 mb-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
          ))}
        </div>
        <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    </article>
  );
}