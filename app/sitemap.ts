import { MetadataRoute } from 'next'
import { getBlogs } from '@/utils/getBlogs'
import { siteMetadata } from '@/utils/siteMetadata'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs()
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = blogs.map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    lastModified: new Date(post.data.publishedAt).toISOString().split('T')[0],
  }))

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

  return [...routes, ...blogRoutes]
}
