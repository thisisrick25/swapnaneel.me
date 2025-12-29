"use client"

import { poppins } from "@/fonts"

export default function NewsSection() {
  const news = [
    {
      date: "Dec 2025",
      content: "Refactoring homepage for better modularity and academic focus.",
    },
    {
      date: "Nov 2025",
      content: "Started exploring distributed systems and compiler design.",
    },
    // Add more news items here
  ]

  return (
    <section className="mb-16">
      <div className="section-header mb-4">
        <h2 className={poppins.className}>News</h2>
      </div>

      <div className="space-y-4">
        {news.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 text-sm">
            <span className="font-mono text-gray-500 dark:text-gray-400 shrink-0 w-20">
              {item.date}
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              {item.content}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
