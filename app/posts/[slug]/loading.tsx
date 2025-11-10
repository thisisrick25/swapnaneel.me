export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 w-full mb-4">
        <div className="bg-neutral-100/60 dark:bg-neutral-900/60 p-3 rounded-lg shadow-xs">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="flex justify-between">
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/6"></div>
          </div>
        </div>
      </div>
      <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
      <div className="h-11 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        ))}
      </div>
    </div>
  );
}