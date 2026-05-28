"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LuHouse, LuFileText, LuGitPullRequest, LuSun, LuMoon } from "react-icons/lu"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { motion } from "motion/react"

export default function FloatingNav() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const normalize = (path: string) => path.replace(/\/+$/, "")
  const currentPath = normalize(pathname)

  const isActive = (href: string) => {
    const normalizedHref = normalize(href)
    if (normalizedHref === "") return currentPath === ""
    return currentPath === normalizedHref || currentPath.startsWith(normalizedHref + "/")
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const links = [
    { href: "/", label: "Home", icon: LuHouse },
    { href: "/posts", label: "Posts", icon: LuFileText },
    { href: "/contributions", label: "OSS", icon: LuGitPullRequest },
  ]

  return (
    <nav className="floating-nav">
      {links.map((link) => {
        const Icon = link.icon
        const active = isActive(link.href)
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-item ${active ? 'active' : 'hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            {active && (
              <motion.div
                layoutId="active-nav-pill"
                className="absolute inset-0 bg-gray-100 dark:bg-zinc-800 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon />
            <span className="hidden sm:inline relative z-10">{link.label}</span>
          </Link>
        )
      })}

      <div className="nav-divider relative z-10" />

      <button
        onClick={mounted ? toggleTheme : undefined}
        className="nav-item hover:text-gray-700 dark:hover:text-gray-300"
        aria-label={mounted ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
      >
        {mounted ? (
          resolvedTheme === "dark" ? <LuSun /> : <LuMoon />
        ) : (
          <div className="w-4 h-4 relative z-10" />
        )}
      </button>
    </nav>
  )
}
