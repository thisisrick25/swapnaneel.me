import { poppins } from "@/fonts"
import { getNews } from "@/utils/getNews"
import BackLink from '@/components/backLink'
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'News',
  description: 'Updates and announcements.',
}

export default async function NewsPage() {
  const news = await getNews()

  return (
    <div className="py-16 sm:py-24">
      <BackLink />

      <div className="section-header mb-6">
        <h1 className={`${poppins.className} text-3xl font-bold`}>News</h1>
      </div>

      <div className="space-y-4">
        {news.length > 0 ? (
          news.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 text-sm">
              <span className="font-mono text-gray-500 dark:text-gray-400 shrink-0 w-30">
                {item.date}
              </span>
              <span
                className="text-gray-700 dark:text-gray-300 [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:hover:underline"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No news updates yet.</p>
        )}
      </div>
    </div>
  )
}
