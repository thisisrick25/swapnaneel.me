import { getGitHubFileContent } from '@/lib/github'

export type PublicationType = 'conference' | 'journal' | 'preprint'

export type PublicationLink = {
  label: string
  url: string
}

export type Publication = {
  title: string
  authors: string
  publishedAt: string
  date: string
  type: PublicationType
  links?: PublicationLink[]
}

export async function getPublications(): Promise<Publication[]> {
  try {
    const rawContent = await getGitHubFileContent('publications.json')
    return JSON.parse(rawContent)
  } catch (error) {
    console.error('Error fetching publications:', error)
    return []
  }
}
