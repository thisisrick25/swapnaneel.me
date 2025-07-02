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
    <div className="bg-neutral-200/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-lg p-[0.4rem] mb-16 sticky top-4 z-[100] w-full flex justify-between items-center gap-4">
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
                ? "text-neutral-900 dark:text-neutral-100 bg-neutral-400/50 dark:bg-neutral-600/50"
                : "text-neutral-600 dark:text-neutral-400"
                } hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-400/80 dark:hover:bg-neutral-600/80`}
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