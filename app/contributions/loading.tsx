export default function Loading() {
  const content = (<>
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="bg-neutral-100/60 dark:bg-neutral-900/60 p-3 rounded-lg my-4 shadow-xs">
        <div className="flex justify-between gap-2 mb-2">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="flex justify-end gap-1">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
          </div>
        </div>
        <div className="flex justify-between text-xs md:text-sm ">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/5"></div>
        </div>
      </div>
    ))}
  </>);

  return (
    <div className="animate-pulse">
      <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
      {content}
    </div>
  );
}