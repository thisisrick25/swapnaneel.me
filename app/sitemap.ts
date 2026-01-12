import { MetadataRoute } from 'next'
import { getBlogs } from '@/utils/getBlogs'
import { getMergedContributions } from '@/utils/getContributions'
import { siteMetadata } from '@/utils/siteMetadata'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs()
  const contributions = await getMergedContributions()
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = blogs.map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    lastModified: new Date(post.data.publishedAt).toISOString().split('T')[0],
  }))

  const contributionRoutes = contributions.map((contribution) => {
    const safeRepo = contribution.repo.replace(/[\/\.]/g, "-").toLowerCase()
    const slug = `${safeRepo}-${contribution.id}`
    return {
      url: `${siteUrl}/contributions/${slug}`,
      lastModified: contribution.merged_at
        ? new Date(contribution.merged_at).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
    }
  })

  const routes = [
    '',
    '/posts',
    '/projects',
    '/contributions',
    '/publications',
    '/news',
    '/tags',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes, ...contributionRoutes]
}

