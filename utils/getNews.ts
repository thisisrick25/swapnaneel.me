import { getGitHubFileContent } from '@/lib/github'

export type NewsItem = {
  date: string
  content: string
}

export async function getNews(): Promise<NewsItem[]> {
  try {
    const rawContent = await getGitHubFileContent('news.json')
    const news: NewsItem[] = JSON.parse(rawContent)

    return news.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()

      // Handle potential invalid dates
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;

      return dateB - dateA // Descending order (newest first)
    })
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}
