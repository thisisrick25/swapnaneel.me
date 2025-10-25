"use client"

import Link from "next/link"
import Image from 'next/image'
import { usePathname } from "next/navigation"
import { HEADER_LINKS } from 'config/links'
import ThemeSwitch from "./themeSwitch"

export default function Header() {
  const pathname = usePathname()

  const normalize = (path: string) => path.replace(/\/+$/, "");
  const currentPath = normalize(pathname);

  return (
    <div className="bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-lg p-[0.4rem] mb-16 sticky top-4 z-[100] w-full flex justify-between items-center gap-4 shadow-sm">
      <Link href="/" className="pl-2" aria-label="Home">
        <div className="relative" style={{ width: '40px', height: '40px' }}>
          <Image className="rounded-full select-none"
            src="https://github.com/thisisrick25.png"
            alt="Picture of the author"
            width={40}
            height={40}
            priority
          />
        </div>
      </Link>
      <nav className="flex gap-2 relative justify-start w-full z-[100] rounded-lg">
        {HEADER_LINKS.map((link) => {
          // Treat all top-level links the same in the header
          const linkHref = normalize(link.href);
          // Check if the current path matches the link href or starts with it
          // This handles cases like /posts/some-post being active for the /posts link
          const isActive = currentPath === linkHref || currentPath.startsWith(linkHref + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              className={`px-2 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in ${isActive
                ? "text-gray-900 dark:text-gray-100 bg-neutral-200 dark:bg-neutral-800"
                : "text-gray-600 dark:text-gray-400"
                } hover:text-gray-900 dark:hover:text-gray-100 hover:bg-neutral-200 dark:hover:bg-neutral-800`}
            >
              {link.text}
            </Link>
          )
        })}
      </nav>
      <div style={{ width: '40px', height: '40px' }}>
        <ThemeSwitch />
      </div>
    </div>
  )
}