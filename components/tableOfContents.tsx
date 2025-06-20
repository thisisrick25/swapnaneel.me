import { raleway } from '@/fonts';

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
    <details className={`${raleway.className} group rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-2 shadow-sm [&_summary::-webkit-details-marker]:hidden`}>
      <summary className="flex cursor-pointer items-center justify-between font-medium text-neutral-900 dark:text-neutral-100 select-none">
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
      <ul className="mt-2">
        {headings.map((heading) => {
          return (
            <li
              key={`#${heading.slug}`}
              className={`${heading.level === 3 ? 'ml-4' : ''}`}
            >
              <a
                href={`#${heading.slug}`}
                className="flex items-center text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
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
