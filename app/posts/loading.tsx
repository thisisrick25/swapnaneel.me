export default function Loading() {
  const content = (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <a key={i} className="grid grid-cols-1 w-full my-4">
          <div className="bg-neutral-100/60 dark:bg-neutral-900/60 p-4 rounded-lg shadow-xs">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="text-xs md:text-sm">
              <div className="flex justify-between">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/6"></div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </>);

  return (
    <div className="animate-pulse">
      <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
      {content}
    </div>
  );
}