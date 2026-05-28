"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LuHouse, LuFileText, LuGitPullRequest, LuSun, LuMoon } from "react-icons/lu"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

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
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-item ${isActive(link.href) ? 'active' : ''}`}
          >
            <Icon />
            <span className="hidden sm:inline">{link.label}</span>
          </Link>
        )
      })}

      <div className="nav-divider" />

      <button
        onClick={mounted ? toggleTheme : undefined}
        className="nav-item"
        aria-label={mounted ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
      >
        {mounted ? (
          resolvedTheme === "dark" ? <LuSun /> : <LuMoon />
        ) : (
          <div className="w-4 h-4" />
        )}
      </button>
    </nav>
  )
}
