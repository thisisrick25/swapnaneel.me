"use client"

import { useState, useEffect } from 'react'
import { LuArrowUp } from 'react-icons/lu'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 z-40 p-3 rounded-full bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-lg dark:shadow-gray-500/10 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all hover:scale-110"
      aria-label="Back to top"
      title="Back to top"
    >
      <LuArrowUp className="w-5 h-5 text-gray-600 dark:text-gray-300" />
    </button>
  )
}
