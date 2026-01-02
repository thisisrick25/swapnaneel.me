import { poppins } from '@/fonts'
import { getProjects } from '@/utils/getProjects'
import ProjectCard from '@/components/projectCard'
import ViewAllLink from '@/components/viewAllLink'

export default async function ProjectShowcaseSection() {
  const projects = await getProjects()
  const featuredProjects = projects.filter(p => p.featured).slice(0, 6)

  if (featuredProjects.length === 0) return null

  return (
    <section className="mb-12">
      <div className="section-header mb-4 flex items-baseline justify-between">
        <h2 className={poppins.className}>Projects</h2>
        <ViewAllLink href="/projects" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {featuredProjects.map((project, index) => (
          <div key={index} className="h-full">
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </section>
  )
}
