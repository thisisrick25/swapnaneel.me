import ViewAllLink from '@/components/viewAllLink'
import { space_grotesk } from "@/fonts"
import { getNews } from "@/utils/getNews"

export default async function NewsSection() {
  const news = await getNews()

  if (news.length === 0) return null

  const displayNews = news.slice(0, 4)

  return (
    <section className="mb-12">
      <div className="section-header mb-4 flex justify-between items-baseline">
        <h2 className={space_grotesk.className}>News</h2>
        <ViewAllLink href="/news" />
      </div>

      <div className="space-y-4">
        {displayNews.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 text-sm">
            <span className="font-mono text-gray-500 dark:text-gray-400 shrink-0 w-30">
              {item.date}
            </span>
            <span
              className="text-gray-700 dark:text-gray-300 [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:hover:underline"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
