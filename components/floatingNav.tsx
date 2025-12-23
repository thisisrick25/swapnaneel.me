"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, GitPullRequest, Menu, Sun, Moon } from "lucide-react"
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
    { href: "/", label: "Home", icon: Home },
    { href: "/posts", label: "Posts", icon: FileText },
    { href: "/contributions", label: "OSS", icon: GitPullRequest },
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

      {mounted && (
        <button
          onClick={toggleTheme}
          className="nav-item"
          aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
        >
          {resolvedTheme === "dark" ? <Sun /> : <Moon />}
        </button>
      )}
    </nav>
  )
}
