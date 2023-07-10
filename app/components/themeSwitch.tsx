'use client'

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Switch } from '@headlessui/react'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  // const [enabled, setEnabled] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = mounted && (theme === "dark" || theme === "system")

  const handleThemeChange = () => {
    // const newTheme = theme === 'dark' ? 'light' : 'dark'
    const newTheme = isDark ? 'light' : 'dark'
    setTheme(newTheme)
    // setEnabled(!enabled)
  }

  return (
    <Switch
      title="Day 'n' Nite"
      // checked={enabled}
      checked={isDark}
      onChange={handleThemeChange}
      // className={`${enabled ? "bg-gray-700" : "bg-gray-300"
      className={`${isDark ? "bg-neutral-700" : "bg-gray-300"
        } relative inline-flex shrink-0 h-6 w-12 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Dark Mode</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        // className={`${enabled ? "translate-x-6" : "translate-x-0"
        className={`${isDark ? "translate-x-6" : "translate-x-0"
          } border-2 border-transparent absolute h-6 w-6 text-gray-900 dark:text-gray-100 transition ease-in-out duration-200`}
      >
        {/* {enabled ? ( */}
        {isDark ? (
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        ) : (
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        )}
      </svg>
      <span
        aria-hidden="true"
        // className={`${enabled ? "translate-x-0 " : "translate-x-6"
        className={`${isDark ? "translate-x-0 " : "translate-x-6"
          } bg-gray-100 pointer-events-none inline-block h-6 w-6 rounded-full shadow-lg transform ring-0 transition ease-in-out duration-200  `}
      ></span>
    </Switch>
  )
}
