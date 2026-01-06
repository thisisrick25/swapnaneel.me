import projectsData from '@/data/projects.json'

export type Project = {
  title: string
  description: string
  link: string
  techStack: string[]
  featured: boolean
}

export async function getProjects(): Promise<Project[]> {
  try {
    return projectsData as Project[]
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}
