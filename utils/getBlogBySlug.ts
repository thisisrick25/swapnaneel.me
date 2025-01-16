import type { Blog } from 'content-collections'

export const getBlogBySlug = (blogs: Blog[], slug: string) => {
  const blog = blogs.find((blog) => blog.slug === slug)
  return blog
} 