import publicationsData from '@/data/publications.json'

export type PublicationType = 'conference' | 'journal' | 'preprint'

export type PublicationMetaItem = {
  kind: 'year' | 'type' | 'link'
  label: string
  url?: string
}

export type PublicationAuthor = {
  name: string
  isMe?: boolean
}

export type Publication = {
  title: string
  authors: PublicationAuthor[]
  venue: string
  meta: PublicationMetaItem[]
}

export async function getPublications(): Promise<Publication[]> {
  try {
    return (publicationsData as Publication[]).sort((a, b) => {
      const yearA = parseInt(a.meta.find((m) => m.kind === 'year')?.label || '0')
      const yearB = parseInt(b.meta.find((m) => m.kind === 'year')?.label || '0')
      return yearB - yearA
    })
  } catch (error) {
    console.error('Error fetching publications:', error)
    return []
  }
}
