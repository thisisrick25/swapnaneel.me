import { inter } from '@/fonts';

type Heading = {
  text: string;
  level: number;
  slug: string;
};

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <details className={`${inter.className} group rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-800/50 px-4 py-3 shadow-sm [&_summary::-webkit-details-marker]:hidden`}>
      <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-900 dark:text-gray-100 select-none">
        Table of Contents
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 opacity-70 transition-transform group-open:rotate-180"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </summary>
      <ul className="mt-3 space-y-1">
        {headings.map((heading) => {
          return (
            <li
              key={`#${heading.slug}`}
              className={`${heading.level === 3 ? 'ml-4' : ''}`}
            >
              <a
                href={`#${heading.slug}`}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              >
                {heading.level === 3 && (
                  <span className="mr-2 h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                )}
                <span>
                  {heading.text}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
