"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HEADER_LINKS } from 'config/links'
import ThemeSwitch from "./themeSwitch"

export default function Header() {
  const pathname = usePathname()

  return (
    <div className="border border-stone-800/90 p-[0.4rem] rounded-lg mb-12 sticky top-4 z-[100] bg-stone-900/80 backdrop-blur-md mx-auto flex justify-between items-center gap-4">
      <nav className="flex gap-2 relative justify-start w-full z-[100] rounded-lg">
        {HEADER_LINKS.map((link) => {
          // Remove trailing slash for comparison
          const normalize = (path: string) => path.replace(/\/+$/, "");
          const current = normalize(pathname);
          const href = normalize(link.href);

          // Active if exact match or current path starts with href + "/"
          const isActive =
            current === href || current.startsWith(href + "/");

          return (
            <Link
              key={link.href}
              className={`px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in ${
                isActive ? "text-zinc-100" : "text-zinc-400"
              }`}
              href={link.href}
            >
              <span>{link.text}</span>
            </Link>
          );
        })}
      </nav>
      <ThemeSwitch />
    </div>
  )
}