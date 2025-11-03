export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
      <div className="my-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="grid grid-cols-1 w-full my-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}