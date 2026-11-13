import { space_grotesk } from "@/fonts"
import { getPublications } from "@/utils/getPublications"
import ViewAllLink from '@/components/viewAllLink'
import PublicationItem from '@/components/publicationItem'
import { StaggerContainer, StaggerItem } from '@/components/stagger'

export default async function PublicationSection() {
  const publications = await getPublications()

  if (publications.length === 0) return null

  const displayPublications = publications.slice(0, 4)

  return (
    <section className="mb-12">
      <div className="section-header mb-6 flex justify-between items-baseline">
        <div>
          <h2 className={space_grotesk.className}>Publications</h2>
        </div>
        <ViewAllLink href="/publications" />
      </div>

      <StaggerContainer className="space-y-0">
        {displayPublications.map((pub, index) => (
          <StaggerItem key={index} className="h-full">
            <PublicationItem
              title={pub.title}
              authors={pub.authors}
              venue={pub.venue}
              meta={pub.meta}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
