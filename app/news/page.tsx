import { poppins } from "@/fonts"
import { getNews } from "@/utils/getNews"
import Link from "next/link"
import { LuArrowLeft } from "react-icons/lu"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'News',
  description: 'Updates and announcements.',
}

export default async function NewsPage() {
  const news = await getNews()

  return (
    <div className="py-16 sm:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
      >
        <LuArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <div className="section-header mb-8">
        <h1 className={`${poppins.className} text-3xl font-bold`}>News</h1>
      </div>

      <div className="space-y-6">
        {news.length > 0 ? (
          news.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 pb-6 border-b border-gray-100 dark:border-zinc-800 last:border-0">
              <span className="font-mono text-gray-500 dark:text-gray-400 shrink-0 w-24 pt-0.5">
                {item.date}
              </span>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {item.content}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No news updates yet.</p>
        )}
      </div>
    </div>
  )
}
