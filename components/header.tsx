"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HEADER_LINKS } from 'config/links'
import ThemeSwitch from "./themeSwitch"

export default function Header() {
  const pathname = usePathname()

  return (
    <div className="border border-stone-800/90 p-[0.4rem] rounded-lg mb-16 sticky top-4 z-[100] bg-stone-900/80 backdrop-blur-md mx-auto flex justify-between items-center gap-4">
      <Link href="/" className="flex items-center" aria-label="Home">
        <span className="w-8 h-8 flex items-center justify-center aspect-square rounded-full bg-stone-800 text-zinc-100 font-bold text-xl leading-none select-none">
          S
        </span>
      </Link>
      <nav className="flex gap-2 relative justify-start w-full z-[100] rounded-lg">
        {HEADER_LINKS.map((link) => {
          const normalize = (path: string) => path.replace(/\/+$/, "");
          const current = normalize(pathname);
          const href = normalize(link.href);
          const isActive =
            current === href || current.startsWith(href + "/");

          return link.children ? (
            <div
              key={link.href}
              className={`relative group px-2 py-2 rounded-md text-sm lg:text-base no-underline duration-300 ease-in ${
                isActive ? "text-zinc-100 bg-stone-800" : "text-zinc-400"
              } hover:text-zinc-100 hover:bg-stone-800 cursor-pointer`}
            >
              <span>{link.text}</span>
              <div className="absolute left-0 mt-5 w-48 bg-stone-900 border border-stone-800 rounded shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in group-hover:delay-0 delay-200">
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block px-4 py-2 text-zinc-400 hover:text-zinc-100 hover:bg-stone-800 duration-300 ease-in rounded"
                  >
                    {child.text}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={link.href}
              className={`px-2 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in ${
                isActive ? "text-zinc-100" : "text-zinc-400"
              } hover:text-zinc-100 hover:bg-stone-800`}
              href={link.href}
            >
              <span>{link.text}</span>
            </Link>
          )
        })}
      </nav>
      <ThemeSwitch />
    </div>
  )
}