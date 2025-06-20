'use client'

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = mounted && (theme === "dark" || theme === "system")

  const handleThemeChange = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <button
      type="button"
      title="Day 'n' Nite"
      aria-label="Toggle dark mode"
      onClick={handleThemeChange}
      className="p-2 text-black dark:text-white inline-flex items-center justify-center rounded-md hover:bg-neutral-400/80 dark:hover:bg-neutral-600/80 duration-300 ease-in transition-colors"
    >
      <span className="sr-only">Toggle theme</span>
      <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {isDark ? (
          // Sun icon
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
          </>
        ) : (
          // Moon icon
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        )}
      </svg>
    </button>
  )
}
