import projectsData from '@/data/projects.json'

export type Project = {
  title: string
  description: string
  link: string
  tags: string[]
  featured: boolean
}

async function fetchFromGitHub(link: string): Promise<Project | null> {
  const match = link.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+?)\/?$/)
  if (!match) return null

  const [, owner, repo] = match

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return null

    const data = await res.json()
    const topics: string[] = data.topics || []

    return {
      title: data.name || owner + '/' + repo,
      description: data.description || '',
      link,
      tags: topics,
      featured: false,
    }
  } catch {
    return null
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const staticProjects = projectsData as Project[]

    const fetched = await Promise.all(
      staticProjects.map(async (p) => {
        const github = await fetchFromGitHub(p.link)
        return github ? { ...github, featured: p.featured } : p
      })
    )

    return fetched
  } catch (error) {
    console.error('Error fetching projects:', error)
    return projectsData as Project[]
  }
}
