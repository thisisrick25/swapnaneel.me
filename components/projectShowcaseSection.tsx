import { poppins } from '@/fonts'
import { getProjects } from '@/utils/getProjects'
import ProjectCard from '@/components/projectCard'
import { Link } from 'next-view-transitions'

export default async function ProjectShowcaseSection() {
  const projects = await getProjects()
  const featuredProjects = projects.filter(p => p.featured)

  if (featuredProjects.length === 0) return null

  return (
    <section className="mb-12">
      <div className="section-header mb-4 flex items-baseline justify-between">
        <h2 className={poppins.className}>Projects</h2>
        <Link
          href="/projects"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredProjects.map((project, index) => (
          <div key={index} className="h-full">
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </section>
  )
}
