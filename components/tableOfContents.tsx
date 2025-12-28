"use client"

import { useState } from 'react';
import { poppins } from '@/fonts';
import { LuList, LuChevronDown } from 'react-icons/lu';

type Heading = {
  text: string;
  level: number;
  slug: string;
};

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!headings || headings.length === 0) {
    return null;
  }

  // Get indent class based on heading level
  const getIndentClass = (level: number) => {
    switch (level) {
      case 3: return 'ml-4';
      case 4: return 'ml-8';
      case 5: return 'ml-12';
      default: return '';
    }
  };

  return (
    <div className="mb-8 border border-gray-200 dark:border-zinc-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${poppins.className} w-full flex items-center justify-between gap-2 p-4 bg-gray-50 dark:bg-zinc-800/50 text-left hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors`}
      >
        <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          <LuList className="w-4 h-4 text-gray-500" />
          Table of Contents
          <span className="text-xs text-gray-400 font-normal">({headings.length} items)</span>
        </span>
        <LuChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <nav className="p-4 pt-0">
          <ol className="mt-3 space-y-1.5">
            {headings.map((heading, index) => {
              const isH2 = heading.level === 2;
              return (
                <li
                  key={`#${heading.slug}`}
                  className={getIndentClass(heading.level)}
                >
                  <a
                    href={`#${heading.slug}`}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-start gap-2 py-1 text-sm transition-colors duration-150 ${isH2
                        ? 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                      }`}
                  >
                    <span className={`shrink-0 w-5 text-xs tabular-nums ${isH2 ? 'text-gray-400 dark:text-gray-500' : 'text-gray-300 dark:text-gray-600'
                      }`}>
                      {isH2 ? `${headings.filter((h, i) => h.level === 2 && i <= index).length}.` : '—'}
                    </span>
                    <span className="group-hover:underline underline-offset-2">
                      {heading.text}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </div>
  );
}
