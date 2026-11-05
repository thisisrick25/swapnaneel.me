import publicationsData from '@/data/publications.json'

export type PublicationType = 'conference' | 'journal' | 'preprint'

export type PublicationLink = {
  label: string
  url: string
}

export type PublicationAuthor = {
  name: string
  isMe?: boolean
}

export type Publication = {
  title: string
  authors: PublicationAuthor[]
  venue: string
  year: string
  type: PublicationType
  status?: string
  paperId?: string
  links?: PublicationLink[]
}

export async function getPublications(): Promise<Publication[]> {
  try {
    return (publicationsData as Publication[]).sort((a, b) => parseInt(b.year) - parseInt(a.year))
  } catch (error) {
    console.error('Error fetching publications:', error)
    return []
  }
}
