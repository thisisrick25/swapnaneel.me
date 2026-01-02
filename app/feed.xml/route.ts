import { getBlogs } from '@/utils/getBlogs'
import { siteMetadata } from '@/utils/siteMetadata'

export async function GET() {
  const posts = await getBlogs()
  const siteUrl = siteMetadata.siteUrl

  const itemsXml = posts
    .sort((a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime())
    .map((post) =>
      `<item>
  <title>${post.data.title}</title>
  <link>${siteUrl}/posts/${post.slug}</link>
  <description>${post.data.description || ''}</description>
  <pubDate>${new Date(post.data.publishedAt).toUTCString()}</pubDate>
  <guid>${siteUrl}/posts/${post.slug}</guid>
</item>`
    )
    .join('\n')

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${siteMetadata.title}</title>
    <link>${siteUrl}</link>
    <description>${siteMetadata.description}</description>
    <language>${siteMetadata.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
