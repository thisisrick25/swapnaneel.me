import publicationsData from '@/data/publications.json'

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
    // Sort by date descending (assuming format "YYYY")
    return (publicationsData as Publication[]).sort((a, b) => parseInt(b.date) - parseInt(a.date))
  } catch (error) {
    console.error('Error fetching publications:', error)
    return []
  }
}
