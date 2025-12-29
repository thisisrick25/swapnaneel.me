import { getGitHubFileContent } from '@/lib/github'

export type NewsItem = {
  date: string
  content: string
}

export async function getNews(): Promise<NewsItem[]> {
  try {
    const rawContent = await getGitHubFileContent('news.json')
    return JSON.parse(rawContent)
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}
