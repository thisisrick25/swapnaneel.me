import { Link } from 'next-view-transitions'
import { LuArrowLeft } from 'react-icons/lu'
import { poppins, ibm_plex_mono } from '@/fonts'
import { getProjects } from '@/utils/getProjects'
import ProjectCard from '@/components/projectCard'

export const metadata = {
  title: 'Projects | Swapnaneel Patra',
  description: 'A collection of my projects and experiments.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/"
          className={`inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-6 group ${ibm_plex_mono.className}`}
        >
          <LuArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>
        <h1 className={`text-3xl font-bold mb-4 ${poppins.className}`}>Projects</h1>
        <p className="text-gray-600 dark:text-gray-400">
          A collection of projects, tools, and experiments I&apos;ve built.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="h-full">
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </div>
  )
}
