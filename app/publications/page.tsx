import { space_grotesk } from "@/fonts"
import { Metadata } from "next"
import { getPublications } from "@/utils/getPublications"
import BackLink from '@/components/backLink'
import { StaggerContainer, StaggerItem } from '@/components/stagger'
import PublicationItem from '@/components/publicationItem'

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Research papers, journal articles, and preprints.',
}

export default async function PublicationsPage() {
  const publications = await getPublications()

  return (
    <div className="py-16 sm:py-24">
      <BackLink />

      <div className="section-header mb-8">
        <h1 className={`${space_grotesk.className} text-3xl font-bold`}>Publications</h1>
      </div>

      <StaggerContainer className="space-y-0">
        {publications.length > 0 ? (
          publications.map((pub, index) => (
            <StaggerItem key={index} className="h-full">
              <PublicationItem
                title={pub.title}
                authors={pub.authors}
                venue={pub.venue}
                meta={pub.meta}
              />
            </StaggerItem>
          ))
        ) : (
          <p className="text-gray-500">No publications yet.</p>
        )}
      </StaggerContainer>
    </div>
  )
}
