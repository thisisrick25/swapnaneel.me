import { poppins } from '@/fonts';

type Heading = {
  text: string;
  level: number;
  slug: string;
};

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (!headings || headings.length === 0) {
    return null;
  }

  const hasBullet = (text: string) => text.startsWith('- ') || text.startsWith('* ') || /^\d+\.\s/.test(text);

  return (
    <details className={`${poppins.className} group bg-neutral-100/60 dark:bg-neutral-900/60 p-4 rounded-lg shadow-xs [&_summary::-webkit-details-marker]:hidden`}>
      <summary className="flex cursor-pointer items-center justify-between text-xs md:text-sm lg:text-base text-gray-900 dark:text-gray-100 select-none">
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
                className="flex items-center text-xs md:text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 duration-300 ease-in transition-colors"
              >
                {!hasBullet(heading.text) && (
                  <span className="mr-2">•</span>
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
