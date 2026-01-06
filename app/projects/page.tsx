import { poppins } from '@/fonts'
import { getProjects } from '@/utils/getProjects'
import ProjectCard from '@/components/projectCard'
import BackLink from '@/components/backLink'

export const metadata = {
  title: 'Projects | Swapnaneel Patra',
  description: 'A collection of my projects and experiments.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="py-16 sm:py-24">
      {/* Header */}
      <div className="mb-12">
        <BackLink />
        <h1 className={`text-3xl font-bold mb-4 ${poppins.className}`}>Projects</h1>
        <p className="text-gray-600 dark:text-gray-400">
          A collection of projects, tools, and experiments I&apos;ve built.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((project, index) => (
          <div key={index} className="h-full">
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </div>
  )
}
