import { NextResponse } from 'next/server'
import { getBlogs } from '@/utils/getBlogs'
import { getMergedContributions } from '@/utils/getContributions'
import { siteMetadata } from '@/utils/siteMetadata'
import projects from '@/data/projects.json'
import news from '@/data/news.json'

export async function GET() {
  try {
    const blogs = await getBlogs()
    const contributions = await getMergedContributions()
    const siteUrl = siteMetadata.siteUrl

    // Build the llms.txt content dynamically
    const content = `# ${siteMetadata.title}

> ${siteMetadata.description}

## About

${siteMetadata.author} (@${siteMetadata.webHandle}) is a software engineer who learns, codes, and builds. This website serves as a personal portfolio showcasing projects, publications, open-source contributions, and technical writing.

## Site Structure

- [Home](${siteUrl}/): Overview with hero, news, education, projects, writing, contributions, and skills sections
- [Posts](${siteUrl}/posts): Technical blog posts and articles
- [Projects](${siteUrl}/projects): Featured software projects
- [Contributions](${siteUrl}/contributions): Open-source contributions
- [Publications](${siteUrl}/publications): Academic and research publications
- [News](${siteUrl}/news): Announcements and updates
- [Tags](${siteUrl}/tags): Browse content by topic

## Recent Blog Posts

${blogs.slice(0, 5).map(blog => `- [${blog.data.title}](${siteUrl}/posts/${blog.slug}): ${blog.data.description}`).join('\n')}

## Featured Projects

${projects.filter((p: any) => p.featured).map((project: any) => `- **${project.title}**: ${project.description} [View](${project.link})`).join('\n')}

## Recent Open Source Contributions

${contributions.slice(0, 5).map(c => `- **${c.repo}**: [${c.title}](${c.html_url})`).join('\n')}

## Recent News

${news.slice(0, 3).map((item: any) => `- **${item.date}**: ${item.content}`).join('\n')}

## Contact

- GitHub: ${siteMetadata.github}
- LinkedIn: ${siteMetadata.linkedin}

## Technical Stack

This site is built with:
- Next.js (React framework)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- MDX (blog content)

## RSS Feed

- [RSS Feed](${siteUrl}/feed.xml)
`

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Error generating llms.txt:', error)
    return new NextResponse('Error generating llms.txt', { status: 500 })
  }
}
