import { space_grotesk } from '@/fonts'
import { getProjects } from '@/utils/getProjects'
import ProjectCard from '@/components/projectCard'
import ViewAllLink from '@/components/viewAllLink'
import { StaggerContainer, StaggerItem } from '@/components/stagger'

export default async function ProjectSection() {
  const projects = await getProjects()
  const featuredProjects = projects.filter(p => p.featured).slice(0, 6)

  if (featuredProjects.length === 0) return null

  return (
    <section className="mb-12" id="projects">
      <div className="section-header mb-4 flex items-baseline justify-between">
        <div>
          <h2 className={space_grotesk.className}>Featured projects</h2>
          <p className="section-description">Selected tools and experiments built with data and machine learning.</p>
        </div>
        <ViewAllLink href="/projects" />
      </div>

      <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <StaggerItem key={index} className="h-full">
            <ProjectCard {...project} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
